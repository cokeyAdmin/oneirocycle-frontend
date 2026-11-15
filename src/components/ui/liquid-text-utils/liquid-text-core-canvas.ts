'use client';

import { useEffect, useState, type RefObject } from 'react';

export function defaultMaxDpr() {
  return 2;
}

export function sizeCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  maxDpr: number,
) {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  return dpr;
}

export function useElementSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return;
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return size;
}
