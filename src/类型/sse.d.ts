declare class SSE {
  constructor(url: string, options?: object);

  INITIALIZING: number;
  CONNECTING: number;
  OPEN: number;
  CLOSED: number;

  url: string;
  headers: object;
  payload: any;
  method: string;
  withCredentials: boolean;

  FIELD_SEPARATOR: string;
  listeners: object;

  xhr: XMLHttpRequest | null;
  readyState: number;
  progress: number;
  chunk: string;

  addEventListener(type: string, listener: (event: CustomEvent) => void): void;
  removeEventListener(type: string, listener: (event: CustomEvent) => void): void;
  dispatchEvent(e: CustomEvent): boolean;
  stream(): void;
  close(): void;
}

declare module "sse.js" {
  export { SSE };
}
