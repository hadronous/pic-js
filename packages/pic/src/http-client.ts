export type HeadersInit = Record<string, string>;

export interface GetOptions {
  headers?: HeadersInit;
  read?: ResponseRead;
}

export type ResponseRead = 'text' | 'json' | 'arrayBuffer' | 'blob' | 'none';

export interface PostOptions<P> {
  body?: P;
  headers?: HeadersInit;
  read?: ResponseRead;
}

export class HttpClient {
  private constructor() {}

  public static async get<R>(url: string, options?: GetOptions): Promise<R> {
    const headers = options?.headers ?? {};
    const read = options?.read ?? 'json';

    const response = await fetch(url, {
      method: 'GET',
      headers: { ...headers, 'Content-Type': 'application/json' },
    });

    return readResponse<R>(response, read);
  }

  public static async post<P, R>(
    url: string,
    options?: PostOptions<P>,
  ): Promise<R> {
    const body = options?.body ? JSON.stringify(options.body) : null;
    const headers = options?.headers ?? {};
    const read = options?.read ?? 'json';

    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });

    return readResponse<R>(response, read);
  }

  public static async delete(url: string): Promise<void> {
    await fetch(url, { method: 'DELETE' });
  }
}

async function readResponse<T>(
  response: Response,
  read: ResponseRead,
): Promise<T> {
  switch (read) {
    case 'json':
      return (await response.json()) as T;
    case 'text':
      return (await response.text()) as T;
    case 'arrayBuffer':
      return (await response.arrayBuffer()) as T;
    case 'blob':
      return (await response.blob()) as T;
    case 'none':
      return undefined as T;
  }
}
