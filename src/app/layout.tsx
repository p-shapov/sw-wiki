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

type RootLayoutProps = {
  drawer: React.ReactNode;
};

const RootLayout: React.FC<React.PropsWithChildren<RootLayoutProps>> = ({
  children,
  drawer,
}) => {
  return (
    <html lang="en">
      <body className={cn("font-sans", fontSans.variable)}>
        <RootProvider>
          <MainLayout>
            {children}
            {drawer}
          </MainLayout>
        </RootProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
