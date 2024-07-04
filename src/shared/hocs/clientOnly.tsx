"use client";

import { useIsMounted } from "../hooks/useIsMounted";

const clientOnly = <TProps,>(Component: React.FC<TProps>) => {
  const ClientOnlyComponent: React.FC<TProps> = (props) => {
    const isMounted = useIsMounted();
    if (!isMounted) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <Component {...(props as any)} />;
  };
  return ClientOnlyComponent;
};

export { clientOnly };
