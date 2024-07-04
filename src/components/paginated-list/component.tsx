"use client";

import React from "react";
import type { QueryHook } from "react-query-kit";

import { clientOnly } from "@sw-wiki/shared/hocs/clientOnly";
import { useSearchParamStorage } from "@sw-wiki/shared/hooks/useSearchParamStorage";
import type {
  ListQueryResult,
  ListQueryVariables,
} from "@sw-wiki/shared/types";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@sw-wiki/shared/ui/pagination/component";

type PaginatedListProps<TData extends { id: string }> = {
  render: (item: TData) => React.ReactNode;
  useListQuery: QueryHook<ListQueryResult<TData>, ListQueryVariables>;
  searchQuery: string;
  emptyMessage?: string;
};

const PaginatedList = clientOnly(
  ({ render, useListQuery, searchQuery, emptyMessage }) => {
    const [page, setPage] = useSearchParamStorage("page", "1");
    const [search] = useSearchParamStorage("query", searchQuery);
    const list = useListQuery({
      variables: {
        search: React.useDeferredValue(search),
        page: Number(page),
      },
    });
    React.useEffect(() => {
      if (page !== "1") setPage("1");
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);
    if (!list.data) {
      return "loading";
    }
    if (list.data.results.length === 0) {
      return emptyMessage ?? "No results found";
    }
    const handlePrevious = () => {
      if (list.data.previous) {
        setPage(String(list.data.previous));
      }
    };
    const handleNext = () => {
      if (list.data.next) {
        setPage(String(list.data.next));
      }
    };
    const mkHandlePage = (page: number) => () => {
      setPage(String(page));
    };
    return (
      <div className="grid gap-y-8">
        <ul className="grid gap-y-2">
          {list.data.results.map((item) => (
            <li key={item.id}>{render(item)}</li>
          ))}
        </ul>
        <Pagination className="w-max mx-[0]">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrevious} />
            </PaginationItem>
            {Array.from({ length: list.data.pages }).map((_, index) => (
              <PaginationItem key={index} onClick={mkHandlePage(index + 1)}>
                <PaginationLink isActive={index + 1 === Number(page)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
) as <TData extends { id: string }>(
  props: PaginatedListProps<TData>,
) => React.ReactNode;

export { PaginatedList };
