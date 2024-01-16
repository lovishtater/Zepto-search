import DropdownInput from "./components/Inputs/DropdownInput";
import { users } from "@/app/mock/mockUsers";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Header />
      <DropdownInput users={users} />
      <Footer />
    </main>
  );
}

const Header = () => (
  <div className="flex flex-col items-center gap-4 md:mb-48 mb-12 ">
    <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      Zepto - Search
    </h1>
    <p className="text-sm text-gray-500">Search for a user by name or email</p>
  </div>
);

const Footer = () => (
  <p className="text-sm text-gray-500 mt-2 fixed bottom-10">
    Made by{" "}
    <a href="https://lovishtater.vercel.app/" className="text-md text-blue-500">
      Lovish Tater
    </a>
  </p>
);
