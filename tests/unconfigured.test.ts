import { expect, it } from 'vitest';
import { unconfiguredServices } from '../src/core/services';

it('fails closed for all unconnected auth and generation operations, never fabricating task IDs', async () => {
  const { auth, generation } = unconfiguredServices;
  await expect(auth.session()).rejects.toMatchObject({
    code: 'NOT_CONFIGURED',
  });
  await expect(auth.signOut()).rejects.toMatchObject({
    code: 'NOT_CONFIGURED',
  });
  await expect(generation.get('test')).rejects.toMatchObject({
    code: 'NOT_CONFIGURED',
  });
  await expect(generation.cancel('test')).rejects.toMatchObject({
    code: 'NOT_CONFIGURED',
  });
  await expect(
    generation.submit(
      {
        kind: 'image',
        mode: 'text-to-image',
        projectId: 'p1',
        prompt: 'fixture',
      },
      'key',
    ),
  ).rejects.toMatchObject({ code: 'NOT_CONFIGURED' });
  expect(() =>
    generation.subscribe('test', {
      onSnapshot: () => {},
      onReconnect: () => {},
      onError: () => {},
    }),
  ).toThrow('NOT_CONFIGURED');
});
