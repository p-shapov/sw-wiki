"use client";

import React from "react";

import { PeopleList } from "@sw-wiki/containers/people-list/component";
import { PeopleSearch } from "@sw-wiki/containers/people-search/component";

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <div className="grid container py-20 gap-y-8">
      <PeopleSearch onSearch={setSearchQuery} />
      <PeopleList searchQuery={searchQuery} />
    </div>
  );
};

export { SearchPage };
