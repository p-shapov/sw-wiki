import NextLink from "next/link";

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string;
}

/**
 * Wrapper under Next.js' NextLink.
 *
 * @param {LinkProps} props - The props for the Link component.
 */

const Link: React.FC<LinkProps> = (props) => {
  return <NextLink {...props} />;
};

export { Link };
