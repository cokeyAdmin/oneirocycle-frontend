import type { BusinessCommand, createCommandBus } from '../../core/commands';

/** Agent input is parsed/authorized by its trusted host; this is not a DOM tool API. */
export type AgentCommand = BusinessCommand & { source: 'agent' };
export type AgentCommandExecutor = Pick<
  ReturnType<typeof createCommandBus>,
  'execute'
>;
