import { createApiClient } from "@generated/swapi";

const swapiAxiosClient = createApiClient(process.env.NEXT_PUBLIC_SWAPI_API_URL);

export { swapiAxiosClient };
