import { createQuery } from "react-query-kit";

import { swapiAxiosClient } from "@sw-wiki/core/swapi/client";

const usePersonQuery = createQuery({
  queryKey: ["person"],
  fetcher: (variables: { personId: number }, ctx?: { signal: AbortSignal }) =>
    swapiAxiosClient
      .GetPerson({
        params: { personId: variables.personId },
        signal: ctx?.signal,
      })
      .then((response) => ({
        ...response,
        id: response.url.split("/").slice(-2)[0],
        bio: response.bio || "n/a",
      })),
});

export { usePersonQuery };
