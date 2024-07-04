"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalStorage } from "@uidotdev/usehooks";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useListPeopleQuery } from "@sw-wiki/shared/queries/useListPeopleQuery";
import {
  CommandDialog,
  CommandDialogContent,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@sw-wiki/shared/ui/command/component";
import { Form, FormField, FormItem } from "@sw-wiki/shared/ui/form/component";

type SearchListProps = {
  onSearch: (query: string) => void;
};

const searchListSchema = z.object({
  query: z.string(),
});

type SearchCommandProps = {
  value: string;
  open: boolean;
  recentSearches: string[];
  onValueChange: (value: string) => void;
  onShortcut: (query: string) => void;
  onOpenChange: (open: boolean) => void;
};

const SearchCommand = React.forwardRef<HTMLInputElement, SearchCommandProps>(
  (
    { value, open, recentSearches, onValueChange, onShortcut, onOpenChange },
    ref,
  ) => {
    const suggestions = useListPeopleQuery({
      variables: {
        search: React.useDeferredValue(value),
        page: 1,
      },
      select: (data) => data.results?.slice(0, 5),
    });
    const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onShortcut(value);
      }
    };
    const handleShortcut = (query: string) => {
      onShortcut(query);
    };
    const handelValueChange = (newValue: string) => {
      onValueChange(newValue);
    };
    return (
      <CommandDialog open={open} onOpenChange={onOpenChange}>
        <CommandDialogTrigger value={value} />
        <CommandDialogContent shouldFilter={false}>
          <CommandInput
            ref={ref}
            value={value}
            onValueChange={handelValueChange}
            onKeyUp={handleEnter}
          />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            {!!recentSearches.length && (
              <>
                <CommandGroup heading="Recent">
                  {recentSearches
                    .filter(
                      (recentSearch) =>
                        recentSearch
                          .toLowerCase()
                          .includes(value.toLowerCase()) || !value,
                    )
                    .slice(0, 5)
                    .map((recentSearch, idx) => (
                      <CommandItem
                        key={idx}
                        asChild
                        value={recentSearch}
                        onSelect={handleShortcut}
                      >
                        <button type="button" className="w-full">
                          {recentSearch}
                        </button>
                      </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}
            {!!suggestions.data?.length && (
              <CommandGroup heading="Suggestions">
                {suggestions.data.map((person) => (
                  <CommandItem
                    key={person.id}
                    value={person.name}
                    onSelect={handleShortcut}
                    asChild
                  >
                    <button type="button" className="w-full">
                      Person: {person.name}
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
);

const SearchList: React.FC<SearchListProps> = ({ onSearch }) => {
  const form = useForm({
    defaultValues: {
      query: "",
    },
    resolver: zodResolver(searchListSchema),
  });
  const [recentSearches, setRecentSearches] = useLocalStorage(
    "recentSearches",
    [] as string[],
  );
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleSearch = ({ query }: { query: string }) => {
    setRecentSearches((prev) => {
      const next = [query, ...prev.filter((item) => item !== query && !!item)];
      return next;
    });
    onSearch(query);
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
                open={dialogOpen}
                value={field.value}
                onValueChange={field.onChange}
                recentSearches={recentSearches}
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
