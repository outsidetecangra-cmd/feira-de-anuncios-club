/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_MOCK_ADMIN?: string;
  readonly VITE_MOCK_ADMIN_USER?: string;
  readonly VITE_MOCK_ADMIN_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
