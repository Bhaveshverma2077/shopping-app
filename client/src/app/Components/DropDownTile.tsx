import Link from "next/link";

import ChevronRightIcon from "./Icons/ChevronRightIcon";

const DropDownTile = (props: {
  icon: React.ReactNode;
  title: string;
  href: string;
}) => {
  return (
    <Link
      href={props.href}
      className="flex hover:bg-zinc-700 p-1 rounded-lg items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="scale-[0.6]">{props.icon}</div>
        <p className="text-[0.7rem]">{props.title}</p>
      </div>
      <ChevronRightIcon></ChevronRightIcon>
    </Link>
  );
};

export default DropDownTile;
