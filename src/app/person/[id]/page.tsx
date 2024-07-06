import { PersonInfo } from "@sw-wiki/modules/person-info/component";

type PersonPageProps = {
  params: {
    id: string;
  };
};

const PersonPage: React.FC<PersonPageProps> = async ({ params }) => {
  const id = params.id;
  return <PersonInfo id={id} />;
};

export default PersonPage;
