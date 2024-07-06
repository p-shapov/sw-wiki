import { Link } from "@sw-wiki/components/link/component";
import { PaginatedList } from "@sw-wiki/components/paginated-list/component";
import { appRoutes } from "@sw-wiki/core/routes";
import { useListPeopleQuery } from "@sw-wiki/shared/queries/useListPeopleQuery";
import {
  TypographyMuted,
  TypographyParagraph,
} from "@sw-wiki/shared/ui/typography/component";

type PeopleListProps = {
  page: number;
  searchQuery: string;
  onPageChange: (page: number) => void;
};

const PeopleList: React.FC<PeopleListProps> = ({
  page,
  searchQuery,
  onPageChange,
}) => {
  return (
    <PaginatedList
      page={page}
      useListQuery={useListPeopleQuery}
      searchQuery={searchQuery}
      onPageChange={onPageChange}
      render={(person) => (
        <div>
          <TypographyParagraph className="w-max">
            {person.name}
          </TypographyParagraph>
          <Link href={appRoutes.person(person.id)}>
            <TypographyMuted>Read more</TypographyMuted>
          </Link>
        </div>
      )}
    />
  );
};

export { PeopleList };
