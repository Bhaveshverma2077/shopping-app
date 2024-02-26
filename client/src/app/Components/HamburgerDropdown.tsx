import DropDownTile from "./DropDownTile";
import ShopIcon from "./Icons/ShopIcon";
import ShoppingCartIcon from "./Icons/ShoppingCartIcon";
import TrendingIcon from "./Icons/TrendingIcon";
import UserIcon from "./Icons/UserIcon";
import LogOutButton from "./LogOutButton";
import LoginButton from "./LoginButton";

const HamburgerDropdown = ({
  userName,
  onShopOrCartClicked,
  showShopOrCartButton,
}: {
  userName?: string;
  onShopOrCartClicked: (shopOrcart: "shop" | "cart") => void;
  showShopOrCartButton: "shop" | "cart";
}) => {
  return (
    <>
      {userName ? (
        <DropDownTile
          icon={<UserIcon></UserIcon>}
          title={userName}
          hideChevronRight
          href="#"
          disabled
        ></DropDownTile>
      ) : (
        <LoginButton></LoginButton>
      )}
      {showShopOrCartButton === "cart" ? (
        <DropDownTile
          icon={<ShopIcon></ShopIcon>}
          onClicked={() => onShopOrCartClicked("shop")}
          title="Shop"
          href="#"
        ></DropDownTile>
      ) : (
        <DropDownTile
          icon={<ShoppingCartIcon></ShoppingCartIcon>}
          onClicked={() => onShopOrCartClicked("cart")}
          title="Cart"
          href="#"
        ></DropDownTile>
      )}
      <DropDownTile
        icon={<TrendingIcon></TrendingIcon>}
        title="Trending"
        href="/"
      ></DropDownTile>
      <DropDownTile
        icon={<img className="w-6 h-6" src="/electronics.webp" alt="" />}
        title="Electronics"
        href="/category/electronics"
      ></DropDownTile>
      <DropDownTile
        icon={<img className="w-6 h-6" src="/fashion.webp" alt="" />}
        title="Fashion"
        href="/category/fashion"
      ></DropDownTile>
      {userName && <LogOutButton></LogOutButton>}
    </>
  );
};

export default HamburgerDropdown;
