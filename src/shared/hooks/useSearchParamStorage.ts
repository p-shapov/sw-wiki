import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useSearchParamStorage = (param: string, defaultValue: string) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const value = searchParams.get(param) || defaultValue;

  const setValue = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(param, newValue);
    router.push(pathname + "?" + params.toString());
  };

  return [value, setValue] as const;
};

export { useSearchParamStorage };
