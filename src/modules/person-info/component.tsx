import { PersonCard } from "@sw-wiki/containers/person-card/component";

type PersonInfoProps = {
  id: string;
};

const PersonInfo: React.FC<PersonInfoProps> = ({ id }) => {
  return (
    <div className="grid container">
      <PersonCard id={id} />
    </div>
  );
};

export { PersonInfo };
