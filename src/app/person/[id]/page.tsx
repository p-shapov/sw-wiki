import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { getQueryClient } from "@sw-wiki/core/query/client";
import { PersonInfo } from "@sw-wiki/modules/person-info/component";
import { usePersonQuery } from "@sw-wiki/shared/queries/usePersonQuery";
import type { InferQueryHookVariables } from "@sw-wiki/shared/types";

type PersonPageProps = {
  params: {
    id: string;
  };
};

const PersonPage: React.FC<PersonPageProps> = async ({ params }) => {
  const queryClient = getQueryClient();
  const id = params.id;
  try {
    await queryClient.prefetchQuery({
      queryKey: usePersonQuery.getKey({ id }),
      queryFn: async ({ queryKey: [, variables] }) =>
        usePersonQuery.fetcher(
          variables as InferQueryHookVariables<typeof usePersonQuery>,
        ),
    });
  } catch {
    notFound();
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PersonInfo id={id} />
    </HydrationBoundary>
  );
};

export default PersonPage;
