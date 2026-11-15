'use client';

import { useSyncExternalStore } from 'react';
import type { BjorkTone } from './liquid-text-core-palette';

const query = '(prefers-color-scheme: dark)';
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener('change', notify);
  return () => media.removeEventListener('change', notify);
};
export function useBjorkTone(tone?: BjorkTone): BjorkTone {
  const dark = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  );
  return tone ?? (dark ? 'dark' : 'light');
}
