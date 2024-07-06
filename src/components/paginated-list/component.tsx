"use client";

import React from "react";
import type { QueryHook } from "react-query-kit";

import { clientOnly } from "@sw-wiki/shared/hocs/clientOnly";
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

type PaginatedListProps<TData extends { id: string }> = {
  page: number;
  useListQuery: QueryHook<ListQueryResult<TData>, ListQueryVariables>;
  searchQuery: string;
  emptyMessage?: string;
  render: (item: TData) => React.ReactNode;
  onPageChange: (page: number) => void;
};

const PaginatedList = clientOnly(
  ({ page, render, useListQuery, searchQuery, emptyMessage, onPageChange }) => {
    const list = useListQuery({
      variables: {
        search: searchQuery,
        page,
      },
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
            <li key={item.id}>{render(item)}</li>
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
  },
) as <TData extends { id: string }>(
  props: PaginatedListProps<TData>,
) => React.ReactNode;

export { PaginatedList };
