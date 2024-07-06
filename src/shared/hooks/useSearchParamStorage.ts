import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const useSearchParamStorage = <TParam extends string>(
  params: Array<TParam>,
  defaultValue: Record<TParam, string>,
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const value = React.useMemo(() => {
    const result = {} as Record<TParam, string>;
    for (const param of params) {
      result[param] = searchParams.get(param) ?? defaultValue[param];
    }
    return result;
  }, [params, searchParams, defaultValue]);
  const setValue: React.Dispatch<React.SetStateAction<Record<TParam, string>>> =
    React.useCallback(
      (stateAction) => {
        const nextState =
          typeof stateAction === "function" ? stateAction(value) : stateAction;
        const nextSearchParams = new URLSearchParams();
        for (const param of params) {
          nextSearchParams.set(param, nextState[param]);
        }
        router.push(pathname + "?" + nextSearchParams.toString());
      },
      [params, value, pathname, router],
    );
  return [value, setValue] as const;
};

export { useSearchParamStorage };
