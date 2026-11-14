import { ApiError } from './api';
import type { AuthPort } from '../modules/account/ports';
import type { GenerationPort } from '../modules/generation/ports';

export interface Services {
  auth: AuthPort;
  generation: GenerationPort;
}
const unavailable = async (): Promise<never> => {
  throw new ApiError('NOT_CONFIGURED');
};

/** No development fake success. Replace via explicit dependency injection after contract approval. */
export const unconfiguredServices: Services = {
  auth: { session: unavailable, signOut: unavailable },
  generation: {
    submit: unavailable,
    get: unavailable,
    cancel: unavailable,
    subscribe: () => {
      throw new ApiError('NOT_CONFIGURED');
    },
  },
};
