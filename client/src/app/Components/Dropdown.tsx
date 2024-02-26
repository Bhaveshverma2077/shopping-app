import { usePathname } from "next/navigation";
import DropDownTile from "./DropDownTile";
import ChevronDownIcon from "./Icons/ChevronDownIcon";
import TrendingIcon from "./Icons/TrendingIcon";

const availableDropdownValue = ["electronics", "fashion"];

const DropDown = () => {
  const path = usePathname();
  const dropDownValue =
    path.split("/")[1] === "category" &&
    availableDropdownValue.includes(path.split("/")[2])
      ? path.split("/")[2]
      : path === "/"
      ? "trending"
      : null;
  return (
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
  );
};

export default DropDown;
