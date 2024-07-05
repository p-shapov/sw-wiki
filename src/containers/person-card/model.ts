import { useLocalStorage } from "@uidotdev/usehooks";

import { schemas } from "@generated/swapi";

import { usePersonQuery } from "@sw-wiki/shared/queries/usePersonQuery";
import type { InferQueryHookVariables } from "@sw-wiki/shared/types";

type PersonDataParams = {
  variables: InferQueryHookVariables<typeof usePersonQuery>;
};

const usePersonData = ({ variables }: PersonDataParams) => {
  const personId = variables.personId;
  const [persistedJson, setPersistedJson] = useLocalStorage<string | null>(
    "person/" +
      personId.toString() +
      `/v${process.env.NEXT_PUBLIC_CHARACTER_STORAGE_VERSION}`,
    null,
  );
  const persisted = persistedJson
    ? schemas.Person.safeParse(JSON.parse(persistedJson))
    : null;
  const person = usePersonQuery({
    variables: { personId },
    enabled: !persisted?.data,
  });
  return {
    ...person,
    data: persisted?.data ?? person.data,
    isHydrated: !!persisted,
    setPersisted: setPersistedJson,
  };
};

export { usePersonData };
