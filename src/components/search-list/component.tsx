// FIX - Fix the issue with the keyboard navigation of the search command items.

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { keepPreviousData } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { useForm } from "react-hook-form";
import type { QueryHook } from "react-query-kit";
import { z } from "zod";

import { useListPeopleQuery } from "@sw-wiki/shared/queries/useListPeopleQuery";
import type {
  ListQueryResult,
  ListQueryVariables,
} from "@sw-wiki/shared/types";
import {
  CommandDialog,
  CommandDialogContent,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sw-wiki/shared/ui/command/component";
import { Form, FormField, FormItem } from "@sw-wiki/shared/ui/form/component";
import { cn } from "@sw-wiki/shared/utils/common";

type SearchCommandProps<TData extends { id: string }> = {
  value: string;
  open: boolean;
  recentQueries: string[];
  useListQuery: QueryHook<ListQueryResult<TData>, ListQueryVariables>;
  select: (item: TData) => string;
  onValueChange: (value: string) => void;
  onShortcut: (query: string) => void;
  onOpenChange: (open: boolean) => void;
};

const SearchCommand = React.forwardRef(
  (
    {
      value,
      open,
      useListQuery,
      recentQueries: _recentQueries,
      select,
      onValueChange,
      onShortcut,
      onOpenChange,
    },
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const recentQueries = React.useMemo(
      () =>
        _recentQueries
          .filter(
            (item) =>
              (item.toLowerCase().includes(value.toLowerCase()) || !value) &&
              !!item,
          )
          .slice(0, 5),
      [_recentQueries, value],
    );
    const suggestedQueries = useListQuery({
      variables: {
        search: value,
        page: 1,
      },
      placeholderData: keepPreviousData,
      select: (data) =>
        data.results
          .map(select)
          .filter((query) => !recentQueries.includes(query))
          .slice(0, 5),
    });
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onShortcut(value);
      }
    };
    const mkHandleShortcut = (query: string) => () => {
      onShortcut(query);
    };
    const handelValueChange = (query: string) => {
      onValueChange(query);
    };
    return (
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <CommandDialogTrigger
          placeholder="Enter a search query..."
          value={value}
        />
        <CommandDialogContent shouldFilter={false}>
          <DialogTitle className="hidden">Search</DialogTitle>
          <DialogDescription className="hidden">Search</DialogDescription>
          <CommandInput
            ref={ref}
            value={value}
            onValueChange={handelValueChange}
            onKeyUp={handleEnter}
          />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            {!!recentQueries.length && (
              <CommandGroup heading="Recent">
                {recentQueries.map((query) => (
                  <CommandItem key={query} asChild>
                    <button
                      type="button"
                      className="w-full"
                      onClick={mkHandleShortcut(query)}
                    >
                      {query}
                    </button>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {!!suggestedQueries.data?.length && (
              <CommandGroup
                heading="Suggestions"
                className={cn({
                  "opacity-20": suggestedQueries.isFetching,
                })}
              >
                {suggestedQueries.data.map((query) => (
                  <CommandItem key={query} asChild>
                    <button
                      type="button"
                      className="w-full"
                      onClick={mkHandleShortcut(query)}
                    >
                      {query}
                    </button>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </CommandDialogContent>
      </CommandDialog>
    );
  },
) as <TData extends { id: string }>(
  props: SearchCommandProps<TData> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  },
  ref: React.ForwardedRef<HTMLInputElement>,
) => React.ReactNode;

type SearchListProps<TData extends { id: string }> = {
  query: string;
  useListQuery: QueryHook<ListQueryResult<TData>, ListQueryVariables>;
  select: (item: TData) => string;
  onQueryChange: (query: string) => void;
};

const schema = z.object({
  query: z.string(),
});

/**
 * Renders a search list component.
 *
 * @template TData - The type of the search result items.
 *
 * @param {string} query - The current search query.
 * @param {QueryHook<ListQueryResult<TData>, ListQueryVariables>} useListQuery - The React Query hook for fetching search results.
 * @param {(data: TData) => string} select - A function that maps an item from the search results to a string value.
 * @param {(query: string) => void} onQueryChange - A callback function that is called when the search query changes.
 *
 * @returns {React.ReactNode} The rendered SearchList component.
 *
 * Known issues:
 * - The search command items are not keyboard navigable because the first item is always focused,
 *   so it's not possible to enter an arbitrary query. This is a known issue and has been reported in [Issue #171](https://github.com/pacocoursey/cmdk/issues/171).
 */

const SearchList = <TData extends { id: string }>({
  query,
  onQueryChange,
  select,
  useListQuery,
}: SearchListProps<TData>): React.ReactNode => {
  const form = useForm({
    defaultValues: {
      query,
    },
    resolver: zodResolver(schema),
  });
  const [recentQueries, setRecentQueries] = useLocalStorage(
    "search-list/recent" + useListPeopleQuery.getKey()[0],
    [] as string[],
  );
  const [dialogOpen, setDialogOpen] = React.useState(false);
  React.useEffect(() => {
    form.setValue("query", query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  const handleSearch = ({ query }: { query: string }) => {
    setRecentQueries((prev) => {
      const next = [query, ...prev.filter((item) => item !== query && !!item)];
      return next;
    });
    onQueryChange(query);
    setDialogOpen(false);
  };
  const handleShortcut = (query: string) => {
    form.setValue("query", query);
    handleSearch({ query });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)}>
        <FormItem>
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <SearchCommand
                ref={field.ref}
                useListQuery={useListQuery}
                open={dialogOpen}
                value={field.value}
                select={select}
                onValueChange={field.onChange}
                recentQueries={recentQueries}
                onShortcut={handleShortcut}
                onOpenChange={setDialogOpen}
              />
            )}
          />
        </FormItem>
      </form>
    </Form>
  );
};

export { SearchList };
