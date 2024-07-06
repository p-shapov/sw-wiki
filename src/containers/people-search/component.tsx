import { SearchList } from "@sw-wiki/components/search-list/component";
import { useListPeopleQuery } from "@sw-wiki/shared/queries/useListPeopleQuery";
import type { InferQueryHookResult } from "@sw-wiki/shared/types";

type SearchPeopleProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

const listSelector = (
  item: InferQueryHookResult<typeof useListPeopleQuery>["results"][number],
) => item.name;

const PeopleSearch: React.FC<SearchPeopleProps> = ({
  query,
  onQueryChange,
}) => {
  return (
    <SearchList
      query={query}
      useListQuery={useListPeopleQuery}
      select={listSelector}
      onQueryChange={onQueryChange}
    />
  );
};

export { PeopleSearch };
