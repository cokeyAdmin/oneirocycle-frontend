import { describe, expect, it } from 'vitest';
import { createCommandBus } from '../src/core/commands';
import { createEditorStore } from '../src/core/editor-store';
import type { ProjectDocument } from '../src/modules/projects/document';
import type { GenerationPort } from '../src/modules/generation/ports';

const document: ProjectDocument = {
  schemaVersion: 1,
  projectId: 'p1',
  serverRevision: 'remote-5',
  nodes: [],
  camera: { position: [0, 0, 5], target: [0, 0, 0], fov: 50 },
};
const node = {
  id: 'n1',
  kind: 'note' as const,
  label: 'Note',
  position: { x: 0, y: 0 },
};
const command = {
  type: 'node.create' as const,
  commandId: 'c1',
  projectId: 'p1',
  source: 'manual' as const,
  expectedEditVersion: 0,
  node,
};
const unavailable: GenerationPort = {
  submit: async () => {
    throw new Error('not configured');
  },
  get: async () => {
    throw new Error('not configured');
  },
  cancel: async () => {
    throw new Error('not configured');
  },
  subscribe: () => () => {},
};

describe('shared business commands', () => {
  it('checks the same policy for Agent and manual operations and rejects stale edits', async () => {
    const store = createEditorStore(document);
    const denied = createCommandBus(store, unavailable, () => false);
    await expect(denied.execute(command)).rejects.toThrow('FORBIDDEN');
    await expect(
      denied.execute({ ...command, source: 'agent' }),
    ).rejects.toThrow('FORBIDDEN');
    const bus = createCommandBus(store, unavailable, () => true);
    await bus.execute(command);
    await expect(
      bus.execute({ ...command, commandId: 'other' }),
    ).rejects.toThrow('CONFLICT');
    expect(store.getState().document.nodes).toHaveLength(1);
  });

  it('changes camera via the same command boundary and validates numeric inputs', async () => {
    const store = createEditorStore(document);
    const bus = createCommandBus(store, unavailable, () => true);
    const cameraCommand = {
      ...command,
      type: 'camera.set' as const,
      camera: {
        position: [1, 2, 3] as const,
        target: [0, 0, 0] as const,
        fov: 60,
      },
    };
    await bus.execute(cameraCommand);
    expect(store.getState().document.camera.fov).toBe(60);
    await expect(
      bus.execute({
        ...cameraCommand,
        expectedEditVersion: 1,
        camera: { ...cameraCommand.camera, fov: Number.NaN },
      }),
    ).rejects.toThrow('INVALID_CAMERA');
  });

  it('submits with a stable idempotency key only after trusted confirmation; no undo for remote effects', async () => {
    const store = createEditorStore(document);
    const keys: string[] = [];
    const generation: GenerationPort = {
      ...unavailable,
      submit: async (input, key) => {
        keys.push(key);
        return {
          id: 'fixture-task',
          projectId: input.projectId,
          sequence: 1,
          status: 'queued',
          progress: null,
        };
      },
    };
    const bus = createCommandBus(
      store,
      generation,
      () => true,
      () => false,
    );
    const submit = {
      ...command,
      type: 'generation.submit' as const,
      input: {
        kind: 'image' as const,
        mode: 'text-to-image' as const,
        projectId: 'p1',
        prompt: 'test',
      },
    };
    await expect(bus.execute(submit)).rejects.toThrow('CONFIRMATION_REQUIRED');
    const confirmed = createCommandBus(
      store,
      generation,
      () => true,
      () => true,
    );
    await confirmed.execute(submit);
    await confirmed.execute(submit);
    expect(keys).toEqual(['c1', 'c1']);
    expect(store.getState().past).toEqual([]);
    expect(store.getState().editVersion).toBe(0);
    await expect(
      confirmed.execute({
        ...submit,
        input: { ...submit.input, projectId: 'other' },
      }),
    ).rejects.toThrow('CONFLICT');
  });
  it('applies an edit, undo and redo without changing server revision; isolates editor instances', async () => {
    const store = createEditorStore(document);
    const other = createEditorStore(document);
    const bus = createCommandBus(store, unavailable, () => true);
    await bus.execute(command);
    expect(store.getState().document.nodes).toEqual([node]);
    expect(other.getState().document.nodes).toEqual([]);
    store.getState().undo();
    expect(store.getState().document.nodes).toEqual([]);
    store.getState().redo();
    expect(store.getState().document.nodes).toEqual([node]);
    expect(store.getState().document.serverRevision).toBe('remote-5');
    expect(store.getState().editVersion).toBe(3);
  });
});
