import React from "react";

import { cn } from "@sw-wiki/shared/utils/common";

interface TypographyHeadingProps
  extends React.ButtonHTMLAttributes<HTMLHeadingElement> {}

const TypographyH1 = React.forwardRef<
  HTMLHeadingElement,
  React.PropsWithChildren<TypographyHeadingProps>
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
});
TypographyH1.displayName = "TypographyH1";

const TypographyH2 = React.forwardRef<
  HTMLHeadingElement,
  React.PropsWithChildren<TypographyHeadingProps>
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  );
});
TypographyH2.displayName = "TypographyH2";

const TypographyH3 = React.forwardRef<
  HTMLHeadingElement,
  React.PropsWithChildren<TypographyHeadingProps>
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
});
TypographyH3.displayName = "TypographyH3";

const TypographyH4 = React.forwardRef<
  HTMLHeadingElement,
  React.PropsWithChildren<TypographyHeadingProps>
>(({ className, ...props }, ref) => {
  return (
    <h4
      ref={ref}
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
});
TypographyH4.displayName = "TypographyH4";

interface TypographyParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TypographyParagraph = React.forwardRef<
  HTMLParagraphElement,
  React.PropsWithChildren<TypographyParagraphProps>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
});
TypographyParagraph.displayName = "TypographyParagraph";

interface TypographyBlockquoteProps
  extends React.HTMLAttributes<HTMLQuoteElement> {}

const TypographyBlockquote = React.forwardRef<
  HTMLQuoteElement,
  React.PropsWithChildren<TypographyBlockquoteProps>
>(({ className, ...props }, ref) => {
  return (
    <blockquote
      ref={ref}
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  );
});
TypographyBlockquote.displayName = "TypographyBlockquote";

interface TypographyUListProps extends React.HTMLAttributes<HTMLUListElement> {}

const TypographyUList = React.forwardRef<
  HTMLUListElement,
  React.PropsWithChildren<TypographyUListProps>
>(({ className, ...props }, ref) => {
  return (
    <ul
      ref={ref}
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  );
});
TypographyUList.displayName = "TypographyList";

interface TypographyLeadProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TypographyLead = React.forwardRef<
  HTMLParagraphElement,
  React.PropsWithChildren<TypographyLeadProps>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-xl text-muted-foreground", className)}
      {...props}
    />
  );
});
TypographyLead.displayName = "TypographyLead";

interface TypographyLargeProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TypographyLarge = React.forwardRef<
  HTMLParagraphElement,
  React.PropsWithChildren<TypographyLargeProps>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
});
TypographyLarge.displayName = "TypographyLarge";

interface TypographySmallProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TypographySmall = React.forwardRef<
  HTMLParagraphElement,
  React.PropsWithChildren<TypographySmallProps>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
});
TypographySmall.displayName = "TypographySmall";

interface TypographyMutedProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const TypographyMuted = React.forwardRef<
  HTMLParagraphElement,
  React.PropsWithChildren<TypographyMutedProps>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
TypographyMuted.displayName = "TypographyMuted";

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyParagraph,
  TypographyBlockquote,
  TypographyUList,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
};
