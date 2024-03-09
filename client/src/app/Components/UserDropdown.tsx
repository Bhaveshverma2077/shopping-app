import ChevronDownIcon from "./Icons/ChevronDownIcon";
import UserIcon from "./Icons/UserIcon";
import LogOutButton from "./LogOutButton";

const UserDropdown = ({ userName }: { userName: string }) => {
  return (
    <div className="relative border gap-2 group border-zinc-900 flex items-center justify-center py-[0.18rem] px-2 rounded-lg">
      <div className="z-20 absolute h-5 w-40 top-10 right-0"></div>
      <div className="scale-75">
        <UserIcon></UserIcon>
      </div>
      <p className="text-[0.8rem]">{userName}</p>

      <ChevronDownIcon></ChevronDownIcon>
      <div className="z-20 hidden absolute -bottom-16 right-0 rounded-lg bg-zinc-900 w-28 p-2 group-hover:flex flex-col gap-1">
        <LogOutButton></LogOutButton>
      </div>
    </div>
  );
};

export default UserDropdown;
