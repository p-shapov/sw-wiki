import type { QueryHook } from "react-query-kit";

type CardQueryVariables = {
  id: string;
};

type ListQueryVariables = {
  search?: string;
  page?: number;
};

type ListQueryResult<TData extends { id: string }> = {
  results: TData[];
  count: number;
  pages: number;
  next: number | null;
  previous: number | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferQueryHookResult<T extends QueryHook<any, any, any>> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends QueryHook<infer R, any, any> ? R : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type InferQueryHookVariables<T extends QueryHook<any, any, any>> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends QueryHook<any, infer V, any> ? V : never;

export type {
  CardQueryVariables,
  ListQueryResult,
  ListQueryVariables,
  InferQueryHookResult,
  InferQueryHookVariables,
};
