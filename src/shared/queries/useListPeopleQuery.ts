import { keepPreviousData } from "@tanstack/react-query";
import { createQuery } from "react-query-kit";

import { swapiAxiosClient } from "@sw-wiki/core/swapi/client";

const useListPeopleQuery = createQuery({
  queryKey: ["allPeople"],
  placeholderData: keepPreviousData,
  fetcher: (variables?: { page?: number; search?: string }) =>
    swapiAxiosClient
      .ListPeople({
        queries: {
          page: variables?.page,
          search: variables?.search,
        },
      })
      .then((response) => ({
        count: response.count,
        pages: Math.ceil(response.count / 10),
        next: response.next?.split("=").slice(-1)[0]
          ? Number(response.next.split("=").slice(-1)[0])
          : null,
        previous: response.previous?.split("=").slice(-1)[0]
          ? Number(response.previous.split("=").slice(-1)[0])
          : null,
        results: response.results.map((person) => ({
          ...person,
          id: person.url.split("/").slice(-2)[0],
        })),
      })),
});

export { useListPeopleQuery };
