"use client";

import { gql, useQuery } from "@apollo/client";

import UserDropdown from "./UserDropdown";
import HamburgerButton from "./HambugerButtton";
import Dropdown from "./Dropdown";
import SearchInput from "./SearchInput";
import LoginButton from "./LoginButton";
import HamburgerDropdown from "./HamburgerDropdown";

const GET_USERNAME = gql`
  query Username {
    user {
      userName
    }
  }
`;

const Nav = ({
  onShopOrCartClicked,
  showShopOrCartButton,
}: {
  showShopOrCartButton: "shop" | "cart";
  onShopOrCartClicked: (shopOrCart: "shop" | "cart") => void;
}) => {
  const { data } = useQuery<{ user: { userName: string } }>(GET_USERNAME);

  const isLoggedIn = !!data?.user;
  return (
    <>
      <nav className="flex gap-2 items-center">
        <div className="lg:block hidden">
          <Dropdown></Dropdown>
        </div>
        <SearchInput></SearchInput>
        <div className="lg:block hidden">
          {isLoggedIn ? (
            <UserDropdown userName={data?.user?.userName}></UserDropdown>
          ) : (
            <LoginButton></LoginButton>
          )}
        </div>
        <div className="lg:hidden m-1 relative border border-zinc-900 flex group items-center gap-1 justify-center rounded-lg">
          <HamburgerButton></HamburgerButton>
          <div className="z-20 absolute h-6 w-40 top-8 right-0"></div>
          <div className="z-20 hidden absolute -bottom-44 right-0 rounded-lg bg-zinc-900 w-40 p-2 group-hover:flex flex-col gap-1">
            <HamburgerDropdown
              onShopOrCartClicked={onShopOrCartClicked}
              showShopOrCartButton={showShopOrCartButton}
              userName={data?.user?.userName}
            ></HamburgerDropdown>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
