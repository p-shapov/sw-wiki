import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

import { getQueryClient } from "@sw-wiki/core/query/client";
import { SearchPerson } from "@sw-wiki/modules/search-person/component";
import { useListPeopleQuery } from "@sw-wiki/shared/queries/useListPeopleQuery";
import type { InferQueryHookVariables } from "@sw-wiki/shared/types";

type RootPageProps = {
  searchParams: {
    page?: number;
    search?: string;
  };
};

const RootPage: React.FC<RootPageProps> = async ({ searchParams }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: useListPeopleQuery.getKey({
      page: Number(searchParams.page) || 1,
      search: searchParams.search,
    }),
    queryFn: async ({ queryKey: [, variables] }) =>
      useListPeopleQuery.fetcher(
        variables as InferQueryHookVariables<typeof useListPeopleQuery>,
      ),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchPerson />
    </HydrationBoundary>
  );
};

export default RootPage;
