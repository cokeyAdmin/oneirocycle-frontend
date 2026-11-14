import { expect, it } from 'vitest';
import { GET } from '../src/app/health/route';

it('reports only frontend process liveness, without implying provider readiness', async () => {
  const response = GET();
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({
    service: 'oneirocycle-frontend',
    status: 'ok',
  });
});
