import DropdownInput from "./components/Inputs/DropdownInput";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-12 text-black">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Zepto - Search
        </span>
      </h1>
      <DropdownInput />
    </main>
  );
}
