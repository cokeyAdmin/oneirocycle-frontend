export interface Asset {
  id: string;
  projectId: string;
  mediaType: 'image' | 'video';
  mimeType: string;
  /** Persistent identity is id, not a short-lived signed URL or browser blob URL. */
  filename: string;
}
