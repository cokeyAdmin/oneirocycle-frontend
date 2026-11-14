import type { ImageGenerationInput } from './image';
import type { VideoGenerationInput } from './video';

export type GenerationInput = ImageGenerationInput | VideoGenerationInput;
/** Internal frontend types, NOT asserted to be backend wire schemas. */
export type TaskSnapshot = {
  id: string;
  projectId: string;
  sequence: number;
} & (
  | { status: 'queued' | 'running'; progress: number | null }
  | { status: 'succeeded'; assetIds: readonly string[] }
  | { status: 'failed'; error: { code: string; message: string } }
  | { status: 'canceled' }
);
export interface TaskObserver {
  onSnapshot(snapshot: TaskSnapshot): void;
  onReconnect(): void;
  onError(error: unknown): void;
}
export interface GenerationPort {
  submit(
    input: GenerationInput,
    idempotencyKey: string,
    signal?: AbortSignal,
  ): Promise<TaskSnapshot>;
  get(taskId: string, signal?: AbortSignal): Promise<TaskSnapshot>;
  cancel(taskId: string, signal?: AbortSignal): Promise<TaskSnapshot>;
  /** Adapter owns transport reconnect/backoff/cursor. Consumer re-fetches on reconnect. */
  subscribe(taskId: string, observer: TaskObserver): () => void;
}
