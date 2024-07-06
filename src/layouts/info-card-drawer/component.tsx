"use client";

import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@sw-wiki/shared/ui/sheet/component";

type InfoCardDrawerProps = {
  title: string;
};

const InfoCardDrawer: React.FC<
  React.PropsWithChildren<InfoCardDrawerProps>
> = ({ title, children }) => {
  const router = useRouter();
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };
  return (
    <Sheet defaultOpen={true} onOpenChange={handleOpenChange}>
      <SheetContent className="sm:max-w-[75vw]">
        <SheetHeader className="pb-8">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export { InfoCardDrawer };
