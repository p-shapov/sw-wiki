declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // APP
      NEXT_PUBLIC_SWAPI_API_URL: string;
      NEXT_PUBLIC_INFO_CARD_STORAGE_VERSION?: string;
    }
  }
}

export {};
