// FIX - Fix issue with search params reset when the modal route is executed.

"use client";

import { keepPreviousData } from "@tanstack/react-query";
import React from "react";
import type { QueryHook } from "react-query-kit";

import type {
  ListQueryResult,
  ListQueryVariables,
} from "@sw-wiki/shared/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@sw-wiki/shared/ui/pagination/component";
import { cn } from "@sw-wiki/shared/utils/common";

type PaginatedListProps<TData extends { id: string }> = {
  page: number;
  useListQuery: QueryHook<ListQueryResult<TData>, ListQueryVariables>;
  searchQuery: string;
  emptyMessage?: string;
  render: (item: TData) => React.ReactNode;
  onPageChange: (page: number) => void;
};

/**
 * A paginated list component.
 *
 * @template TData - The type of data in the list.
 *
 * @param {number} page - The current page number.
 * @param {(item: TData) => React.ReactNode} render - The function to render each item in the list.
 * @param {QueryHook<ListQueryResult<TData>, ListQueryVariables>} useListQuery - The hook function for fetching the list data.
 * @param {string} searchQuery - The search query string.
 * @param {string} emptyMessage - The message to display when the list is empty.
 * @param {(page: number) => void} onPageChange - The callback function for page change events.
 *
 * Known issues: - The search params reset when the [modal](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes) route is executed.
 */

const PaginatedList = <TData extends { id: string }>({
  page,
  render,
  useListQuery,
  searchQuery,
  emptyMessage,
  onPageChange,
}: PaginatedListProps<TData>) => {
  const list = useListQuery({
    variables: {
      search: searchQuery,
      page,
    },
    placeholderData: keepPreviousData,
    retry: false,
  });
  if (!list.data) {
    return "Loading...";
  }
  if (list.data.results.length === 0) {
    return emptyMessage ?? "No results found";
  }
  const handlePrevious = () => {
    if (list.data.previous) {
      onPageChange(list.data.previous);
    }
  };
  const handleNext = () => {
    if (list.data.next) {
      onPageChange(list.data.next);
    }
  };
  const mkHandlePage = (page: number) => () => {
    onPageChange(page);
  };
  return (
    <div className="grid gap-y-8">
      <ul className="grid gap-y-2">
        {list.data.results.map((item) => (
          <li
            key={item.id}
            className={cn({
              "opacity-20": list.isFetching,
            })}
          >
            {render(item)}
          </li>
        ))}
      </ul>
      <Pagination className="w-max mx-[0]">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} />
          </PaginationItem>
          {Array.from({ length: list.data.pages }).map((_, index) => {
            if (
              index === 0 ||
              index === list.data.pages - 1 ||
              (index >= Number(page) - 2 && index <= Number(page) + 2)
            ) {
              return (
                <PaginationItem key={index} onClick={mkHandlePage(index + 1)}>
                  <PaginationLink isActive={index + 1 === Number(page)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (
              index === Number(page) - 3 ||
              index === Number(page) + 3
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}
          <PaginationItem>
            <PaginationNext onClick={handleNext} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export { PaginatedList };
