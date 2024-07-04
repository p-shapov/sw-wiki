import { createQuery } from "react-query-kit";

import { swapiAxiosClient } from "@sw-wiki/core/swapi/client";

const usePersonQuery = createQuery({
  queryKey: ["person"],
  fetcher: (variables: { personId: number }) =>
    swapiAxiosClient
      .GetPerson({ params: { personId: variables.personId } })
      .then((response) => ({
        ...response,
        id: response.url.split("/").slice(-2)[0],
      })),
});

export { usePersonQuery };
