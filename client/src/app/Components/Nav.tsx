"use client";
import { useRef } from "react";
import DropDownTile from "./DropDownTile";
import ChevronDownIcon from "./Icons/ChevronDownIcon";
import ChevronRightIcon from "./Icons/ChevronRightIcon";
import SearchIcon from "./Icons/SearchIcon";
import SunIcon from "./Icons/SunIcon";
import TrendingIcon from "./Icons/TrendingIcon";
import { usePathname, useRouter } from "next/navigation";

const availableDropdownValue = ["electronics", "fashion"];

const Nav = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const path = usePathname();
  const dropDownValue =
    path.split("/")[1] === "category" &&
    availableDropdownValue.includes(path.split("/")[2])
      ? path.split("/")[2]
      : path === "/"
      ? "trending"
      : null;

  return (
    <nav className="flex gap-2 items-center">
      <div className="relative border border-zinc-900 flex group items-center gap-1 justify-center px-4 py-2 rounded-lg">
        <div className="scale-75">
          {dropDownValue == "trending" ? (
            <TrendingIcon></TrendingIcon>
          ) : dropDownValue === "electronics" ? (
            <img className="w-6 h-6" src="/electronics.webp" alt="" />
          ) : dropDownValue === "fashion" ? (
            <img className="w-6 h-6" src="/fashion.webp" alt="" />
          ) : (
            <div></div>
          )}
        </div>
        <p className="text-[0.8rem]">
          {dropDownValue === null
            ? ""
            : `${dropDownValue[0].toUpperCase()}${dropDownValue.slice(1)}`}
        </p>
        <ChevronDownIcon></ChevronDownIcon>
        <div className="z-20 absolute h-5 w-40 top-10 right-0"></div>
        <div className="z-20 hidden absolute -bottom-24 right-0 rounded-lg bg-zinc-900 w-40 p-2 group-hover:flex flex-col gap-1">
          {dropDownValue !== "electronics" && (
            <DropDownTile
              icon={<img className="w-6 h-6" src="/electronics.webp" alt="" />}
              title="Electronics"
              href="/category/electronics"
            ></DropDownTile>
          )}
          {dropDownValue !== "fashion" && (
            <DropDownTile
              icon={<img className="w-6 h-6" src="/fashion.webp" alt="" />}
              title="Fashion"
              href="/category/fashion"
            ></DropDownTile>
          )}
          {dropDownValue !== "trending" && (
            <DropDownTile
              icon={<TrendingIcon></TrendingIcon>}
              title="Trending"
              href="/"
            ></DropDownTile>
          )}
        </div>
      </div>
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
          className="focus:bg-zinc-900 outline-none pl-9 placeholder:text-[0.8rem] bg-zinc-950 border border-zinc-900 px-2 py-[0.3rem] w-36 rounded-lg"
          type="text"
        />
        <div className="absolute left-3 bottom-1 scale-[0.7]">
          <SearchIcon></SearchIcon>
        </div>
      </form>
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
