import Image from "next/image";
import Link from "next/link";

import swLogo from "@public/images/sw-logo.svg";

import { appRoutes } from "@sw-wiki/core/routes";

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid gap-y-10 py-4">
      <header className="flex justify-center h-max">
        <Link href={appRoutes.root}>
          <Image src={swLogo} alt="StarWars logo" width={125} height={54} />
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export { MainLayout };
