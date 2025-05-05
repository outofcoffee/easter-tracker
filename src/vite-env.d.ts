/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PROD: boolean;
    readonly DEV: boolean;
    readonly VITE_DEBUG?: string;
    readonly VITE_MOCK_TIME?: string;
    readonly VITE_MOCK_DATE?: string;
    readonly [key: string]: string | undefined;
  }
}