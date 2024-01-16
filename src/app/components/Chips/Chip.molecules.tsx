import { User } from "@/app/types/users";
import Image from "next/image";

interface IChipAction {
  user: User;
  handleClick: (user: User) => void;
}

interface IChipAvatar {
  url?: string;
  name?: string;
}

interface IChipLabel {
  value: string;
}

export const ChipAction: React.FC<IChipAction> = ({ handleClick, user }) => {
  return (
    <div
      onClick={() => handleClick(user)}
      className="font-bold tracking-wide cursor-pointer p-1 hover:bg-gray-950 rounded-full h-5 w-5 flex items-center transition-all ease-linear justify-center "
    >
      &times;
    </div>
  );
};

export const ChipAvatar: React.FC<IChipAvatar> = ({ url, name = "" }) => {
  const displayName = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
  return (
    <div className="font-bold bg-gray-200 text-black rounded-full flex items-center justify-center text-lg h-8 w-8 md:h-10 md:w-10">
      {url ? <Image src={url} alt={name} /> : displayName || "👻"}
    </div>
  );
};

export const ChipLabel: React.FC<IChipLabel> = ({ value }) => {
  return <div className="text-sm tracking-tight">{value}</div>;
};
