import type { z } from "zod";

import { SumApiError } from "./errors.js";

export type HttpClientOptions = {
  baseUrl: string;
  fetch: typeof fetch;
  getToken: () => string | undefined;
};

export type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

export class HttpClient {
  constructor(private readonly options: HttpClientOptions) {}

  async request<TSchema extends z.ZodTypeAny>(
    path: string,
    schema: TSchema,
    options: RequestOptions = {},
  ): Promise<z.infer<TSchema>> {
    const headers: Record<string, string> = {
      accept: "application/json",
    };

    if (options.body !== undefined) headers["content-type"] = "application/json";
    if (options.auth !== false) {
      const token = this.options.getToken();
      if (!token) throw new Error("Authentication token is required. Call login() or pass token in the constructor.");
      headers.authorization = `Bearer ${token}`;
    }

    const response = await this.options.fetch(`${this.options.baseUrl}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });

    const text = await response.text();
    const body = text ? JSON.parse(text) : null;

    if (!response.ok) {
      throw new SumApiError(`SUM API request failed with status ${response.status}`, response.status, body);
    }

    return schema.parse(body);
  }
}
