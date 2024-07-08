import Link from "next/link";

import { PaginatedList } from "@sw-wiki/components/paginated-list/component";
import { appRoutes } from "@sw-wiki/core/routes";
import { clientOnly } from "@sw-wiki/shared/hocs/clientOnly";
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

/**
 * Renders a list of people with pagination support.
 *
 * @component
 * @param {number} page - The current page number.
 * @param {string} searchQuery - The search query string.
 * @param {(page: number) => void} onPageChange - The callback function to handle page changes.
 */

const PeopleList: React.FC<PeopleListProps> = clientOnly(
  ({ page, searchQuery, onPageChange }) => {
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
  },
);

export { PeopleList };
