import NextLink from "next/link";

interface LinkProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string;
}

const Link: React.FC<LinkProps> = (props) => {
  return <NextLink {...props} />;
};

export { Link };
