export type Vec3 = readonly [number, number, number];
export interface CameraDocument {
  position: Vec3;
  target: Vec3;
  fov: number;
}
export interface CanvasNodeDocument {
  id: string;
  kind: 'image' | 'video' | 'note';
  position: { x: number; y: number };
  label: string;
  assetId?: string;
}
export interface ProjectDocument {
  schemaVersion: 1;
  projectId: string;
  /** Server concurrency token; never incremented by local undo/redo. */
  serverRevision: string | null;
  nodes: readonly CanvasNodeDocument[];
  camera: CameraDocument;
}
export interface ProjectRepository {
  load(projectId: string, signal?: AbortSignal): Promise<ProjectDocument>;
  save(
    document: ProjectDocument,
    expectedRevision: string | null,
    signal?: AbortSignal,
  ): Promise<ProjectDocument>;
}
