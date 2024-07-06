"use client";

import React from "react";

import { PeopleList } from "@sw-wiki/containers/people-list/component";
import { PeopleSearch } from "@sw-wiki/containers/people-search/component";
import { clientOnly } from "@sw-wiki/shared/hocs/clientOnly";
import { useSearchParamStorage } from "@sw-wiki/shared/hooks/useSearchParamStorage";

/**
 * Known issues: The search query and page number are not preserved when navigating to a [modal](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#modals) route.
 */
const SearchPerson: React.FC = clientOnly(() => {
  // Get search query and page number from URL query params
  const [searchParamsFilters, setSearchParamsFilters] = useSearchParamStorage(
    ["search", "page"],
    {
      search: "",
      page: "1",
    },
  );
  // Initialize filters state with search query and page number due the issue mentioned above
  const [filters, setFilters] = React.useState(searchParamsFilters);
  const handleSearchQueryChange = async (query: string) => {
    setFilters({ search: query, page: "1" });
    setSearchParamsFilters({ search: query, page: "1" });
  };
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page: page.toString() }));
    setSearchParamsFilters((prev) => ({ ...prev, page: page.toString() }));
  };
  return (
    <div className="grid container gap-y-8">
      <PeopleSearch
        query={filters.search}
        onQueryChange={handleSearchQueryChange}
      />
      <PeopleList
        page={Number(filters.page)}
        searchQuery={filters.search}
        onPageChange={handlePageChange}
      />
    </div>
  );
});

export { SearchPerson };
