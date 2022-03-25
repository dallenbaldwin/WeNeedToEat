/// <reference types="vite/client" />

interface ImportMetaEnv {
  // define environment variables that exist in .env here
  // must be prefixed with VITE_APP_
  readonly VITE_APP_API_KEY: string;
  readonly VITE_APP_MESSAGE_SENDER_ID: string;
  readonly VITE_APP_APP_ID: string;
  readonly VITE_APP_AUTH_DOMAIN: string;
  readonly VITE_APP_PROJECT_ID: string;
  readonly VITE_APP_STORAGE_BUCKET: string;
  readonly VITE_APP_VERBOSE: string; // boolean value
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
