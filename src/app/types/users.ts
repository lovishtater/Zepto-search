import { StaticImageData } from "next/image";

export type User = {
  id: number;
  name: string;
  email: string;
  displayPicture?: string | StaticImageData;
};
