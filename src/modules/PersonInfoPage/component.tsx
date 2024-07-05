import { PersonCard } from "@sw-wiki/containers/person-card/component";

type PersonInfoPageProps = {
  personId: number;
};

const PersonInfoPage: React.FC<PersonInfoPageProps> = ({ personId }) => {
  return (
    <div className="grid container p-20">
      <PersonCard personId={personId} />
    </div>
  );
};

export { PersonInfoPage };
