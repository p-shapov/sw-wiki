import { useGlobalStore } from "@sw-wiki/core/global/store";

const useIsMounted = () => {
  const isMounted = useGlobalStore((state) => state.isMounted);
  return isMounted;
};

export { useIsMounted };
