import "@sw-wiki/core/theme/styles.css";

import RootProvider from "./provider";

const metadata = {
  title: "SW Wiki",
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
