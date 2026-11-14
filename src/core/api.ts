export type ApiErrorCode =
  | 'NOT_CONFIGURED'
  | 'INVALID_PATH'
  | 'NETWORK'
  | 'ABORTED'
  | 'UNAUTHENTICATED'
  | 'FORBIDDEN'
  | 'HTTP'
  | 'CONTRACT';

export class ApiError extends Error {
  constructor(
    public readonly code: ApiErrorCode,
    public readonly status: number | null = null,
    public readonly requestId: string | null = null,
  ) {
    super(code);
    this.name = 'ApiError';
  }
  get retryable() {
    return (
      this.code === 'NETWORK' ||
      (this.code === 'HTTP' &&
        (this.status === 429 || (this.status !== null && this.status >= 500)))
    );
  }
}

/** No endpoint catalogue until the backend OpenAPI is approved. No implicit retry. */
export class ApiClient {
  constructor(
    private readonly origin: string,
    private readonly transport: typeof fetch = fetch,
  ) {}

  async request<T>(
    approvedPath: string,
    decode: (data: unknown) => T,
    init: RequestInit = {},
  ): Promise<T> {
    if (!this.origin) throw new ApiError('NOT_CONFIGURED');
    if (
      !approvedPath.startsWith('/') ||
      approvedPath.startsWith('//') ||
      approvedPath.includes('\\')
    )
      throw new ApiError('INVALID_PATH');
    let url: URL;
    try {
      const base = new URL(this.origin);
      url = new URL(approvedPath, base);
      if (
        !['http:', 'https:'].includes(base.protocol) ||
        base.username ||
        base.password ||
        url.origin !== base.origin
      )
        throw new Error('invalid origin');
    } catch {
      throw new ApiError('INVALID_PATH');
    }
    if (init.signal?.aborted) throw new ApiError('ABORTED');
    let response: Response;
    try {
      response = await this.transport(url, {
        ...init,
        credentials: init.credentials ?? 'same-origin',
      });
    } catch {
      throw new ApiError(init.signal?.aborted ? 'ABORTED' : 'NETWORK');
    }
    const requestId = response.headers.get('x-request-id');
    if (!response.ok)
      throw new ApiError(
        response.status === 401
          ? 'UNAUTHENTICATED'
          : response.status === 403
            ? 'FORBIDDEN'
            : 'HTTP',
        response.status,
        requestId,
      );
    try {
      const data: unknown =
        response.status === 204 ? undefined : await response.json();
      return decode(data);
    } catch {
      if (init.signal?.aborted) throw new ApiError('ABORTED');
      throw new ApiError('CONTRACT', response.status, requestId);
    }
  }
}
