import { SearchList } from "@sw-wiki/components/search-list/component";
import { clientOnly } from "@sw-wiki/shared/hocs/clientOnly";
import { useListPeopleQuery } from "@sw-wiki/shared/queries/useListPeopleQuery";
import type { InferQueryHookResult } from "@sw-wiki/shared/types";

type SearchPeopleProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const listSelector = (
  item: InferQueryHookResult<typeof useListPeopleQuery>["results"][number],
) => item.name;

/**
 * Renders a component for searching people.
 *
 * @param {string} query - The search query.
 * @param {(query: string) => void} onQueryChange - The function to handle query changes.
 */

const PeopleSearch: React.FC<SearchPeopleProps> = clientOnly(
  ({ query, onQueryChange }) => {
    return (
      <SearchList
        query={query}
        useListQuery={useListPeopleQuery}
        select={listSelector}
        onQueryChange={onQueryChange}
      />
    );
  },
);

export { PeopleSearch };
