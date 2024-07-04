import { SearchList } from "@sw-wiki/components/search-list/component";
import { useListPeopleQuery } from "@sw-wiki/shared/queries/useListPeopleQuery";
import type { InferQueryHookResult } from "@sw-wiki/shared/types";

type SearchPeopleProps = {
  onSearch: (query: string) => void;
};

const listSelector = (
  item: InferQueryHookResult<typeof useListPeopleQuery>["results"][number],
) => item.name;

const PeopleSearch: React.FC<SearchPeopleProps> = ({ onSearch }) => {
  return (
    <SearchList
      useListQuery={useListPeopleQuery}
      select={listSelector}
      onSearch={onSearch}
    />
  );
};

export { PeopleSearch };
