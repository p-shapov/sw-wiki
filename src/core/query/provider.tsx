"use client";

import { QueryClientProvider as ClientProvider } from "@tanstack/react-query";

import { queryClient } from "./client";

const QueryClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <ClientProvider client={queryClient}>{children}</ClientProvider>;
};

export { QueryClientProvider };
