'use client';

/** No Object3D instances in project documents. No engine import on ordinary routes. */
export async function loadDirectorEngine() {
  if (typeof window === 'undefined') throw new Error('CLIENT_ONLY');
  const [three, fiber] = await Promise.all([
    import('three'),
    import('@react-three/fiber'),
  ]);
  return { three, fiber };
}
