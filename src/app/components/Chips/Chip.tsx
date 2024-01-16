import { User } from "@/app/types/users";
import { ChipAction, ChipAvatar, ChipLabel } from "./Chip.molecules";

interface ChipProps {
  user: User;
  lastBackspacedUser: User | null;
  handleUserSelect: (user: User) => void;
}

export const Chip: React.FC<ChipProps> = ({
  handleUserSelect,
  user,
  lastBackspacedUser,
}) => {
  return (
    <div
      className={`flex items-center gap-2 bg-gray-200 rounded-full w-fit min-w-40 pr-2 justify-between cursor-pointer m-1 ${
        user === lastBackspacedUser ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-2">
        <ChipAvatar name={user.name} />
        <ChipLabel value={user.name} />
      </div>
      <ChipAction user={user} handleClick={handleUserSelect} />
    </div>
  );
};
