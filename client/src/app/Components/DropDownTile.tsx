import Link from "next/link";

import ChevronRightIcon from "./Icons/ChevronRightIcon";

const DropDownTile = ({
  icon,
  title,
  hideChevronRight,
  disabled,
  href,
  onClicked,
}: {
  icon: React.ReactNode;
  title: string;
  hideChevronRight?: boolean;
  disabled?: boolean;
  href: string;
  onClicked?: (...args: any) => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onClicked}
      className={`flex ${
        disabled ? "" : "hover:bg-zinc-700"
      } p-1 rounded-lg items-center justify-between`}
    >
      <div className="flex items-center gap-2">
        <div className="scale-[0.6]">{icon}</div>
        <p className="text-[0.7rem]">
          {title.length > 11 ? `${title.substring(0, 11)}...` : title}
        </p>
      </div>
      {hideChevronRight || <ChevronRightIcon></ChevronRightIcon>}
    </Link>
  );
};

export default DropDownTile;
