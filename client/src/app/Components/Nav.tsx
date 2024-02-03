import ChevronDownIcon from "./Icons/ChevronDownIcon";
import SearchIcon from "./Icons/SearchIcon";
import SunIcon from "./Icons/SunIcon";
import TrendingIcon from "./Icons/TrendingIcon";

const Nav = () => {
  return (
    <nav className="flex gap-2 items-center">
      <div className="border border-zinc-900 flex items-center gap-1 justify-center px-4 py-2 rounded-lg">
        <div className="scale-75">
          <TrendingIcon></TrendingIcon>
        </div>
        <p className="text-[0.8rem]">Trending</p>
        <ChevronDownIcon></ChevronDownIcon>
      </div>
      <div className="relative">
        <input
          placeholder="Search"
          className="focus:bg-zinc-900 outline-none pl-9 placeholder:text-[0.8rem] bg-zinc-950 border border-zinc-900 px-2 py-[0.3rem] w-36 rounded-lg"
          type="text"
        />
        <div className="absolute left-3 bottom-1 scale-[0.7]">
          <SearchIcon></SearchIcon>
        </div>
      </div>
      <div className="border border-zinc-900 fl p-1 rounded-lg">
        <div className="scale-[0.6]">
          <SunIcon></SunIcon>
        </div>
      </div>
      <div className="border gap-2 border-zinc-900 flex items-center justify-center p-2 rounded-lg">
        <img
          src="http://localhost:3000/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F119785304%3Fv%3D4&w=16&q=75"
          alt=""
        />
        <p className="text-[0.8rem]">Bhavesh Verma</p>
        <ChevronDownIcon></ChevronDownIcon>
      </div>
    </nav>
  );
};

export default Nav;
