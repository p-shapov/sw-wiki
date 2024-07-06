import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import type { QueryHook } from "react-query-kit";

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

type UseFormHook<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
> = (
  props?: UseFormProps<TFieldValues, TContext>,
) => UseFormReturn<TFieldValues, TContext, TTransformedValues>;

export type {
  ListQueryResult,
  ListQueryVariables,
  InferQueryHookResult,
  InferQueryHookVariables,
  UseFormHook,
};
