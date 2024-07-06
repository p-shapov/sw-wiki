import { PersonCard } from "@sw-wiki/containers/person-card/component";
import { cn } from "@sw-wiki/shared/utils/common";

type PersonInfoProps = {
  id: string;
  asContainer?: boolean;
};

const PersonInfo: React.FC<PersonInfoProps> = ({ id, asContainer = true }) => {
  return (
    <div
      className={cn({
        ["container"]: asContainer,
      })}
    >
      <PersonCard id={id} />
    </div>
  );
};

export { PersonInfo };
