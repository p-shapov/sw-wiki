"use client";

import React from "react";

import { PeopleList } from "@sw-wiki/containers/people-list/component";
import { PeopleSearch } from "@sw-wiki/containers/people-search/component";
import { clientOnly } from "@sw-wiki/shared/hocs/clientOnly";
import { useSearchParamStorage } from "@sw-wiki/shared/hooks/useSearchParamStorage";

const SearchPage: React.FC = clientOnly(() => {
  const [filters, setFilters] = useSearchParamStorage(["search", "page"], {
    search: "",
    page: "1",
  });
  const handleSearchQueryChange = async (query: string) => {
    setFilters({ search: query, page: "1" });
  };
  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page: page.toString() }));
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

export { SearchPage };
