export interface Session {
  userId: string;
  permissions: readonly string[];
}
/** Adapter decides cookie/BFF/other auth after the OpenAPI agreement. No token persistence. */
export interface AuthPort {
  session(signal?: AbortSignal): Promise<Session | null>;
  signOut(signal?: AbortSignal): Promise<void>;
}
