import React from "react";

import { GlobalProvider } from "@sw-wiki/core/global/provider";
import { ThemeProvider } from "@sw-wiki/core/theme/provider";

const RootProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <GlobalProvider>{children}</GlobalProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
