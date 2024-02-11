"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";

import DropDownTile from "./DropDownTile";
import ChevronDownIcon from "./Icons/ChevronDownIcon";
import SearchIcon from "./Icons/SearchIcon";
import SunIcon from "./Icons/SunIcon";
import TrendingIcon from "./Icons/TrendingIcon";
import UserIcon from "./Icons/UserIcon";
import LogOutButton from "./LogOutButton";

const availableDropdownValue = ["electronics", "fashion"];

const GET_USERNAME = gql`
  query Username {
    user {
      userName
    }
  }
`;

const Nav = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const path = usePathname();
  const router = useRouter();

  const { data, loading, error } = useQuery<{ user: { userName: string } }>(
    GET_USERNAME
  );

  const dropDownValue =
    path.split("/")[1] === "category" &&
    availableDropdownValue.includes(path.split("/")[2])
      ? path.split("/")[2]
      : path === "/"
      ? "trending"
      : null;
  const isLoggedIn = !!data?.user;

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
      {/* <div className="border border-zinc-900 fl p-1 rounded-lg">
        <div className="scale-[0.6]">
          <SunIcon></SunIcon>
        </div>
      </div> */}
      {isLoggedIn ? (
        <div className="relative border gap-2 group border-zinc-900 flex items-center justify-center p-2 rounded-lg">
          <div className="z-20 absolute h-5 w-40 top-10 right-0"></div>
          <img
            src="http://localhost:3000/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F119785304%3Fv%3D4&w=16&q=75"
            alt=""
          />
          <div className="scale-75">
            <UserIcon></UserIcon>
          </div>
          <p className="text-[0.8rem]">{data?.user?.userName}</p>

          <ChevronDownIcon></ChevronDownIcon>
          <div className="z-20 hidden absolute -bottom-16 right-0 rounded-lg bg-zinc-900 w-28 p-2 group-hover:flex flex-col gap-1">
            <LogOutButton></LogOutButton>
          </div>
        </div>
      ) : (
        <Link
          href={"/auth"}
          className="relative border gap-2 group border-zinc-900 flex items-center justify-center p-2 rounded-lg"
        >
          <div className="z-20 absolute h-5 w-40 top-10 right-0"></div>
          <p className="text-[0.8rem]">Log In</p>
        </Link>
      )}
    </nav>
  );
};

export default Nav;
