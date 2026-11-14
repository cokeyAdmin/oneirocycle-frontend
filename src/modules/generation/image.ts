export type ImageGenerationInput = {
  kind: 'image';
  projectId: string;
  prompt: string;
} & (
  { mode: 'text-to-image' } | { mode: 'image-to-image'; sourceAssetId: string }
);
