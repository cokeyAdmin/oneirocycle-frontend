import { QueryClient } from '@tanstack/react-query';
import { expect, it } from 'vitest';
import { taskQueryOptions } from '../src/core/task-query';
import { unconfiguredServices } from '../src/core/services';

it('uses an account/project-scoped Query cache and rejects a cross-project task response', async () => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  const port = {
    ...unconfiguredServices.generation,
    get: async () => ({
      id: 't1',
      projectId: 'p1',
      sequence: 1,
      status: 'queued' as const,
      progress: null,
    }),
  };
  const options = taskQueryOptions(port, {
    accountId: 'u1',
    projectId: 'p1',
    taskId: 't1',
  });
  const snapshot = await client.fetchQuery(options);
  expect(client.getQueryData(options.queryKey)).toEqual(snapshot);
  expect(options.queryKey).not.toEqual(
    taskQueryOptions(port, { accountId: 'u2', projectId: 'p1', taskId: 't1' })
      .queryKey,
  );
  await expect(
    client.fetchQuery(
      taskQueryOptions(port, {
        accountId: 'u1',
        projectId: 'other',
        taskId: 't1',
      }),
    ),
  ).rejects.toMatchObject({ code: 'CONTRACT' });
  client.clear();
});
