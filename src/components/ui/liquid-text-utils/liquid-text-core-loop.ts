'use client';

import { useEffect, useSyncExternalStore, type RefObject } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  );
}

export function useVisibleLoop(
  ref: RefObject<HTMLElement | null>,
  frame: (dt: number) => void,
  { enabled }: { enabled: boolean },
) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;
    let intersecting = false;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      raf = 0;
      frame(Math.min((now - last) / 1000, 1 / 30));
      last = now;
      raf = requestAnimationFrame(tick);
    };
    const update = () => {
      if (intersecting && document.visibilityState === 'visible') {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(tick);
        }
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry?.isIntersecting ?? false;
      update();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      cancelAnimationFrame(raf);
    };
  }, [ref, frame, enabled]);
}
