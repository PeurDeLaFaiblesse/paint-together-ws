interface ImportMetaEnv {
  readonly VITE_WEB_SOCKET: string;
  readonly VITE_BACKEND: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
