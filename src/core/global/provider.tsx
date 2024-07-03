"use client";

import React from "react";

import { useGlobalStore } from "./store";

const GlobalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isMounted, mount } = useGlobalStore((state) => ({
    isMounted: state.isMounted,
    mount: state.mount,
  }));
  React.useEffect(() => {
    if (isMounted) mount();
  }, [isMounted, mount]);
  return children;
};

export { GlobalProvider };
