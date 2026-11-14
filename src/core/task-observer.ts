import { ApiError } from './api';
import type { GenerationPort, TaskSnapshot } from '../modules/generation/ports';

export function isTerminal(snapshot: TaskSnapshot) {
  return (
    snapshot.status === 'succeeded' ||
    snapshot.status === 'failed' ||
    snapshot.status === 'canceled'
  );
}

/** Internal task lifecycle, independent of SSE/WS wire protocol. Polling repairs event gaps. */
export async function observeTask(
  port: GenerationPort,
  taskId: string,
  observer: {
    onSnapshot(snapshot: TaskSnapshot): void;
    onError(error: unknown): void;
  },
  pollMs = 5_000,
  signal?: AbortSignal,
) {
  if (!Number.isFinite(pollMs) || pollMs < 250)
    throw new RangeError('pollMs must be >= 250');
  const controller = new AbortController();
  let stopped = false;
  let latest: TaskSnapshot | undefined;
  let unsubscribe: (() => void) | undefined;
  let timer: ReturnType<typeof setInterval> | undefined;
  let pending: Promise<void> | undefined;

  function stop() {
    if (stopped) return;
    stopped = true;
    signal?.removeEventListener('abort', stop);
    controller.abort();
    if (timer) clearInterval(timer);
    unsubscribe?.();
    unsubscribe = undefined;
  }
  function report(error: unknown) {
    if (!stopped) observer.onError(error);
  }
  function accept(snapshot: TaskSnapshot) {
    if (stopped) return;
    if (
      snapshot.id !== taskId ||
      !Number.isSafeInteger(snapshot.sequence) ||
      snapshot.sequence < 0 ||
      (latest && snapshot.projectId !== latest.projectId)
    ) {
      report(new ApiError('CONTRACT'));
      return;
    }
    if (latest && snapshot.sequence <= latest.sequence) return;
    latest = snapshot;
    observer.onSnapshot(snapshot);
    if (isTerminal(snapshot)) stop();
  }
  function refresh(): Promise<void> {
    if (stopped) return Promise.resolve();
    if (pending) return pending;
    pending = port
      .get(taskId, controller.signal)
      .then(accept)
      .catch(report)
      .finally(() => {
        pending = undefined;
      });
    return pending;
  }

  signal?.addEventListener('abort', stop, { once: true });
  if (signal?.aborted) stop();
  await refresh();
  if (!stopped) {
    timer = setInterval(() => {
      void refresh();
    }, pollMs);
    try {
      const dispose = port.subscribe(taskId, {
        onSnapshot: accept,
        onReconnect: () => {
          void refresh();
        },
        onError: report,
      });
      if (stopped) dispose();
      else unsubscribe = dispose;
    } catch (error) {
      report(error);
    }
  }
  return {
    refresh,
    stop,
    async cancel() {
      if (stopped) return;
      // Do not optimistically mark canceled. A server may return running while cancellation is pending.
      accept(await port.cancel(taskId, controller.signal));
    },
  };
}
