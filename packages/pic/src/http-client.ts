export type HeadersInit = Record<string, string>;

export interface GetOptions {
  headers?: HeadersInit;
}

export interface PostOptions<P> {
  body?: P;
  headers?: HeadersInit;
}

export class HttpClient {
  private constructor() {}

  public static async get<R>(url: string, options?: GetOptions): Promise<R> {
    const headers = options?.headers ?? {};

    const response = await fetch(url, {
      method: 'GET',
      headers: { ...headers, 'Content-Type': 'application/json' },
    });

    return (await response.json()) as R;
  }

  public static async post<P, R>(
    url: string,
    options?: PostOptions<P>,
  ): Promise<R> {
    const body = options?.body ? JSON.stringify(options.body) : null;
    const headers = options?.headers ?? {};

    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });

    return (await response.json()) as R;
  }

  public static async delete(url: string): Promise<void> {
    await fetch(url, { method: 'DELETE' });
  }
}
