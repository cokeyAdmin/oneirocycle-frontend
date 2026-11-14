import { describe, expect, it } from 'vitest';
import { ApiClient, ApiError } from '../src/core/api';

describe('API boundary', () => {
  it('rejects an unconfigured origin instead of inventing success', async () => {
    const api = new ApiClient('');
    await expect(
      api.request('/contract-approved-path', (value) => value),
    ).rejects.toMatchObject({ code: 'NOT_CONFIGURED' });
  });
  it('normalizes HTTP failures without exposing response bodies or credentials', async () => {
    const api = new ApiClient(
      'https://example.test',
      async () =>
        new Response('secret provider text', {
          status: 401,
          headers: { 'x-request-id': 'req-1' },
        }),
    );
    await expect(
      api.request('/approved', (value) => value),
    ).rejects.toMatchObject({
      code: 'UNAUTHENTICATED',
      status: 401,
      requestId: 'req-1',
      retryable: false,
    });
    try {
      await api.request('/approved', (value) => value);
    } catch (error) {
      expect(String(error)).not.toContain('secret');
      expect(error).toBeInstanceOf(ApiError);
    }
  });
  it('decodes unknown JSON and rejects contract-invalid payloads; never auto-retries a mutation', async () => {
    let calls = 0;
    const api = new ApiClient('https://example.test', async () => {
      calls++;
      return Response.json({ unexpected: true });
    });
    await expect(
      api.request(
        '/approved',
        () => {
          throw new Error('invalid schema');
        },
        { method: 'POST' },
      ),
    ).rejects.toMatchObject({ code: 'CONTRACT' });
    expect(calls).toBe(1);
  });
  it('rejects absolute/cross-origin paths and normalizes network/abort errors', async () => {
    const api = new ApiClient('https://example.test', async () => {
      throw new TypeError('network');
    });
    await expect(
      api.request('https://other.test', (v) => v),
    ).rejects.toMatchObject({ code: 'INVALID_PATH' });
    await expect(api.request('//other.test', (v) => v)).rejects.toMatchObject({
      code: 'INVALID_PATH',
    });
    await expect(api.request('/approved', (v) => v)).rejects.toMatchObject({
      code: 'NETWORK',
      retryable: true,
    });
    const controller = new AbortController();
    controller.abort();
    await expect(
      api.request('/approved', (v) => v, { signal: controller.signal }),
    ).rejects.toMatchObject({ code: 'ABORTED', retryable: false });
  });
});
