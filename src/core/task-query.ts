import { queryOptions } from '@tanstack/react-query';
import { ApiError } from './api';
import { isTerminal } from './task-observer';
import type { GenerationPort } from '../modules/generation/ports';

/** Real-time adapters may invalidate this key; reconnect/polling always queries authority. */
export function taskQueryOptions(
  port: GenerationPort,
  scope: { accountId: string; projectId: string; taskId: string },
) {
  return queryOptions({
    queryKey: [
      'account',
      scope.accountId,
      'project',
      scope.projectId,
      'task',
      scope.taskId,
    ] as const,
    queryFn: async ({ signal }) => {
      const task = await port.get(scope.taskId, signal);
      if (task.id !== scope.taskId || task.projectId !== scope.projectId)
        throw new ApiError('CONTRACT');
      return task;
    },
    retry: (count, error) =>
      count < 2 && error instanceof ApiError && error.retryable,
    refetchOnReconnect: 'always',
    refetchInterval: (query) =>
      query.state.data && isTerminal(query.state.data) ? false : 5_000,
  });
}
