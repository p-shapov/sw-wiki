"use client";

import React from "react";

import { SearchList } from "@sw-wiki/components/search-list/component";
import { useIsMounted } from "@sw-wiki/shared/hooks/useIsMounted";

const RootPage: React.FC = () => {
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }
  return <SearchList onSearch={(query) => console.log(query)} />;
};

export default RootPage;
