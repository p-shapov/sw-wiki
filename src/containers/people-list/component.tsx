import { Link } from "@sw-wiki/components/link/component";
import { PaginatedList } from "@sw-wiki/components/paginated-list/component";
import { appRoutes } from "@sw-wiki/core/routes";
import { useListPeopleQuery } from "@sw-wiki/shared/queries/useListPeopleQuery";
import {
  TypographyParagraph,
  TypographySmall,
} from "@sw-wiki/shared/ui/typography/component";

type PeopleListProps = {
  searchQuery: string;
};

const PeopleList: React.FC<PeopleListProps> = ({ searchQuery }) => {
  return (
    <PaginatedList
      useListQuery={useListPeopleQuery}
      searchQuery={searchQuery}
      render={(person) => (
        <TypographyParagraph>
          {person.name}
          <Link href={appRoutes.person(person.id)}>
            <TypographySmall>Read more</TypographySmall>
          </Link>
        </TypographyParagraph>
      )}
    />
  );
};

export { PeopleList };
