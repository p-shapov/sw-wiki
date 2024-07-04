"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import React from "react";

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
};

export { ThemeProvider };
