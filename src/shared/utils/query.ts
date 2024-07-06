import type { QueryHook } from "react-query-kit";

/**
 * Maps a query hook to select a subset of the data returned by the hook.
 *
 * @param useQuery - The original query hook.
 * @param select - A function that selects the desired subset of the data.
 * @returns A new query hook that returns the selected data.
 */

const mapQueryHook = <TData, TSelectedData, TVariables, TError>(
  useQuery: QueryHook<TData, TVariables, TError>,
  select: (data: TData) => TSelectedData,
): QueryHook<TSelectedData, TVariables, TError> => {
  // @ts-expect-error - This is a valid hook
  return (options, queryClient) => {
    return useQuery(
      {
        ...options,
        // @ts-expect-error - This is a valid selector
        select: (data) => select(data),
      },
      queryClient,
    );
  };
};

export { mapQueryHook };
