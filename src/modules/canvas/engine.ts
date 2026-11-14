'use client';

/** Call only when an approved canvas host is activated, not from a root provider. */
export async function loadCanvasEngine() {
  if (typeof window === 'undefined') throw new Error('CLIENT_ONLY');
  return import('@xyflow/react');
}
