import { PersonCard } from "@sw-wiki/containers/person-card/component";

type PersonInfoPageProps = {
  id: string;
};

const PersonInfoPage: React.FC<PersonInfoPageProps> = ({ id }) => {
  return (
    <div className="grid container">
      <PersonCard id={id} />
    </div>
  );
};

export { PersonInfoPage };
