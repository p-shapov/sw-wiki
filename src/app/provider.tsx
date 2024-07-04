import React from "react";

import { GlobalProvider } from "@sw-wiki/core/global/provider";
import { QueryClientProvider } from "@sw-wiki/core/query/provider";
import { ThemeProvider } from "@sw-wiki/core/theme/provider";

const RootProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <GlobalProvider>{children}</GlobalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootProvider;
