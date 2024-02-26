import ChevronDownIcon from "./Icons/ChevronDownIcon";
import UserIcon from "./Icons/UserIcon";
import LogOutButton from "./LogOutButton";

const UserDropdown = ({ userName }: { userName: string }) => {
  return (
    <div className="relative border gap-2 group border-zinc-900 flex items-center justify-center p-2 rounded-lg">
      <div className="z-20 absolute h-5 w-40 top-10 right-0"></div>
      <img
        src="http://localhost:3000/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F119785304%3Fv%3D4&w=16&q=75"
        alt=""
      />
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
