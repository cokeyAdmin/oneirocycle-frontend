import { expect, it } from 'vitest';
import { loadCanvasEngine } from '../src/modules/canvas/engine';
import { loadDirectorEngine } from '../src/modules/director/engine';

it('refuses server-side engine activation; importing the loaders is safe in Node', async () => {
  await expect(loadCanvasEngine()).rejects.toThrow('CLIENT_ONLY');
  await expect(loadDirectorEngine()).rejects.toThrow('CLIENT_ONLY');
});
