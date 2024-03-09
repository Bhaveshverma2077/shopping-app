import { useRouter } from "next/navigation";
import { useRef } from "react";
import SearchIcon from "./Icons/SearchIcon";

const SearchInput = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (searchRef.current?.value) {
          router.push(`/search/${searchRef.current?.value}`);
        }
      }}
      className="relative"
    >
      <input
        ref={searchRef}
        placeholder="Search"
        className="focus:bg-zinc-900 text-[0.8rem] outline-none pl-9 placeholder:text-[0.8rem] bg-zinc-950 border border-zinc-900 px-2 py-[0.3rem] w-36 rounded-lg"
        type="text"
      />
      <div className="absolute left-3 bottom-1 scale-[0.7]">
        <SearchIcon></SearchIcon>
      </div>
    </form>
  );
};

export default SearchInput;
