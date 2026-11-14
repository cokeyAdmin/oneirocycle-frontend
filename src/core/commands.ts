import type {
  CanvasNodeDocument,
  CameraDocument,
} from '../modules/projects/document';
import type {
  GenerationInput,
  GenerationPort,
} from '../modules/generation/ports';
import type { EditorStore } from './editor-store';

interface CommandBase {
  commandId: string;
  projectId: string;
  source: 'manual' | 'agent';
  expectedEditVersion: number;
}
export type BusinessCommand = CommandBase &
  (
    | { type: 'node.create'; node: CanvasNodeDocument }
    | { type: 'camera.set'; camera: CameraDocument }
    | { type: 'generation.submit'; input: GenerationInput }
  );

export function createCommandBus(
  store: EditorStore,
  generation: GenerationPort,
  authorize: (command: BusinessCommand) => boolean,
  /** Trusted host capability, not a boolean supplied by the Agent command. */
  confirmGeneration: (command: BusinessCommand) => boolean = () => false,
) {
  return {
    async execute(command: BusinessCommand) {
      const state = store.getState();
      if (!authorize(command)) throw new Error('FORBIDDEN');
      if (!command.commandId.trim()) throw new Error('INVALID_COMMAND');
      if (
        command.projectId !== state.document.projectId ||
        command.expectedEditVersion !== state.editVersion
      ) {
        throw new Error('CONFLICT');
      }
      switch (command.type) {
        case 'node.create': {
          if (
            !command.node.id.trim() ||
            !Number.isFinite(command.node.position.x) ||
            !Number.isFinite(command.node.position.y)
          )
            throw new Error('INVALID_NODE');
          if (state.document.nodes.some((node) => node.id === command.node.id))
            throw new Error('DUPLICATE_NODE');
          state.apply({
            ...state.document,
            nodes: [...state.document.nodes, command.node],
          });
          return;
        }
        case 'camera.set': {
          const camera = command.camera;
          if (
            ![...camera.position, ...camera.target, camera.fov].every(
              Number.isFinite,
            ) ||
            camera.fov <= 0 ||
            camera.fov >= 180
          )
            throw new Error('INVALID_CAMERA');
          state.apply({ ...state.document, camera });
          return;
        }
        case 'generation.submit':
          if (command.input.projectId !== command.projectId)
            throw new Error('CONFLICT');
          if (!confirmGeneration(command))
            throw new Error('CONFIRMATION_REQUIRED');
          // Backend adapter MUST enforce the same key across retries/reloads.
          return generation.submit(command.input, command.commandId);
        default: {
          const unsupported: never = command;
          throw new Error(`UNSUPPORTED_COMMAND: ${String(unsupported)}`);
        }
      }
    },
  };
}
