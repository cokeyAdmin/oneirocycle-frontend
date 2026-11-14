'use client';

import { DesktopHomepage } from './desktop-homepage';
import { MobileHomepage } from './mobile-homepage';

export function HomepageClient() {
  return (
    <>
      <DesktopHomepage />
      <MobileHomepage />
    </>
  );
}
