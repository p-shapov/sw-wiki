import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { getQueryClient } from "@sw-wiki/core/query/client";
import { PersonInfoPage } from "@sw-wiki/modules/PersonInfoPage/component";
import { usePersonQuery } from "@sw-wiki/shared/queries/usePersonQuery";
import type { InferQueryHookVariables } from "@sw-wiki/shared/types";

type PersonPageProps = {
  params: {
    personId: string;
  };
};

const PersonPage: React.FC<PersonPageProps> = async ({ params }) => {
  const queryClient = getQueryClient();
  const personId = Number(params.personId);
  if (Number.isNaN(personId)) {
    notFound();
  }
  try {
    await queryClient.prefetchQuery({
      queryKey: usePersonQuery.getKey({ personId }),
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
      <PersonInfoPage personId={Number(params.personId)} />
    </HydrationBoundary>
  );
};

export default PersonPage;
