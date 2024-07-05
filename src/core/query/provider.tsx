"use client";

import { QueryClientProvider as ClientProvider } from "@tanstack/react-query";

import { getQueryClient } from "./client";

const QueryClientProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const queryClient = getQueryClient();
  return <ClientProvider client={queryClient}>{children}</ClientProvider>;
};

export { QueryClientProvider };
