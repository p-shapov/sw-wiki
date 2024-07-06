import "@sw-wiki/core/theme/styles.css";
import { Inter as FontSans } from "next/font/google";

import { MainLayout } from "@sw-wiki/layouts/main-layout/component";
import { cn } from "@sw-wiki/shared/utils/common";

import RootProvider from "./provider";

const metadata = {
  title: "SW Wiki",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body className={cn("font-sans", fontSans.variable)}>
        <RootProvider>
          <MainLayout>{children}</MainLayout>
        </RootProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
