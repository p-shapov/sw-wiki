import { InfoCardDrawer } from "@sw-wiki/layouts/info-card-drawer/component";
import { PersonInfo } from "@sw-wiki/modules/person-info/component";

type PersonPagePropsDrawer = {
  params: {
    id: string;
  };
};

const PersonPageDrawer: React.FC<PersonPagePropsDrawer> = async ({
  params,
}) => {
  const id = params.id;
  return (
    <InfoCardDrawer title="Person Info">
      <PersonInfo id={id} asContainer={false} />
    </InfoCardDrawer>
  );
};

export default PersonPageDrawer;
