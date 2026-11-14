export type VideoGenerationInput = {
  kind: 'video';
  projectId: string;
  prompt: string;
} & (
  { mode: 'text-to-video' } | { mode: 'image-to-video'; sourceAssetId: string }
);
