import { afterEach, describe, expect, it, vi } from 'vitest';
import { observeTask } from '../src/core/task-observer';
import type {
  GenerationPort,
  TaskObserver,
  TaskSnapshot,
} from '../src/modules/generation/ports';

const queued: TaskSnapshot = {
  id: 'fixture',
  projectId: 'p1',
  sequence: 1,
  status: 'queued',
  progress: null,
};
afterEach(() => vi.useRealTimers());

function fixture(initial: TaskSnapshot = queued) {
  let snapshot = initial;
  let observer: TaskObserver | undefined;
  let reads = 0;
  let closed = 0;
  const port: GenerationPort = {
    submit: async () => {
      throw new Error('not a provider');
    },
    get: async () => {
      reads++;
      return snapshot;
    },
    cancel: async () => ({
      ...queued,
      sequence: 3,
      status: 'running',
      progress: null,
    }),
    subscribe: (_id, next) => {
      observer = next;
      return () => {
        closed++;
      };
    },
  };
  return {
    port,
    set: (next: TaskSnapshot) => {
      snapshot = next;
    },
    observer: () => observer!,
    reads: () => reads,
    closed: () => closed,
  };
}

describe('task recovery', () => {
  it('does not read or subscribe when the caller is already disposed', async () => {
    vi.useFakeTimers();
    const f = fixture();
    const lifetime = new AbortController();
    lifetime.abort();
    const onSnapshot = vi.fn();
    const onError = vi.fn();
    const handle = await observeTask(
      f.port,
      'fixture',
      { onSnapshot, onError },
      1000,
      lifetime.signal,
    );
    await handle.refresh();
    await handle.cancel();
    expect(f.reads()).toBe(0);
    expect(f.observer()).toBeUndefined();
    expect(onSnapshot).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
  it('aborts a pending initial read without accepting its late result or subscribing', async () => {
    vi.useFakeTimers();
    const f = fixture();
    let resolveRead!: (snapshot: TaskSnapshot) => void;
    let requestSignal: AbortSignal | undefined;
    f.port.get = (_id, signal) => {
      requestSignal = signal;
      return new Promise((resolve) => {
        resolveRead = resolve;
      });
    };
    const lifetime = new AbortController();
    const onSnapshot = vi.fn();
    const onError = vi.fn();
    const pending = observeTask(
      f.port,
      'fixture',
      { onSnapshot, onError },
      1000,
      lifetime.signal,
    );
    lifetime.abort();
    const wasAborted = requestSignal?.aborted;
    resolveRead(queued);
    const handle = await pending;
    try {
      expect(wasAborted).toBe(true);
      expect(onSnapshot).not.toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();
      expect(f.observer()).toBeUndefined();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      handle.stop();
    }
  });
  it('queries first, re-queries on reconnect, ignores older events and stops at failure', async () => {
    vi.useFakeTimers();
    const f = fixture();
    const seen: TaskSnapshot[] = [];
    const handle = await observeTask(f.port, 'fixture', {
      onSnapshot: (s) => seen.push(s),
      onError: () => {},
    });
    expect(seen).toEqual([queued]);
    f.observer().onSnapshot({
      ...queued,
      sequence: 0,
      status: 'running',
      progress: 50,
    });
    expect(seen).toHaveLength(1);
    f.set({
      ...queued,
      sequence: 2,
      status: 'failed',
      error: { code: 'fixture-failure', message: 'test only' },
    });
    f.observer().onReconnect();
    await vi.advanceTimersByTimeAsync(0);
    expect(seen.at(-1)?.status).toBe('failed');
    expect(f.reads()).toBe(2);
    expect(f.closed()).toBe(1);
    await vi.advanceTimersByTimeAsync(20_000);
    expect(f.reads()).toBe(2);
    handle.stop();
  });
  it('does not interpret a cancellation request as canceled; polling remains authoritative', async () => {
    vi.useFakeTimers();
    const f = fixture();
    const seen: TaskSnapshot[] = [];
    const handle = await observeTask(
      f.port,
      'fixture',
      { onSnapshot: (s) => seen.push(s), onError: () => {} },
      1000,
    );
    await handle.cancel();
    expect(seen.at(-1)?.status).toBe('running');
    f.set({ ...queued, sequence: 4, status: 'canceled' });
    await vi.advanceTimersByTimeAsync(1000);
    expect(seen.at(-1)?.status).toBe('canceled');
    expect(f.closed()).toBe(1);
  });
  it('reports transport errors and can recover; unsubscribes on disposal', async () => {
    vi.useFakeTimers();
    const f = fixture();
    const errors: unknown[] = [];
    const handle = await observeTask(f.port, 'fixture', {
      onSnapshot: () => {},
      onError: (e) => errors.push(e),
    });
    f.observer().onError(new Error('offline'));
    expect(errors).toHaveLength(1);
    f.set({ ...queued, sequence: 2, status: 'running', progress: 20 });
    await handle.refresh();
    handle.stop();
    expect(f.closed()).toBe(1);
    const count = f.reads();
    await vi.advanceTimersByTimeAsync(20_000);
    expect(f.reads()).toBe(count);
  });
});
