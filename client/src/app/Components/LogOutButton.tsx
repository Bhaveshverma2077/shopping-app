import LogOutIcon from "./Icons/LogOutIcon";
import { usePathname, useRouter } from "next/navigation";

const LogOutButton = () => {
  const path = usePathname();
  return (
    <a
      onClick={() => {
        localStorage.removeItem("token");
      }}
      href={path}
      className="flex hover:bg-zinc-700 p-1 rounded-lg items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="scale-[0.6]">{<LogOutIcon></LogOutIcon>}</div>
        <p className="text-[0.7rem]">{"Log Out"}</p>
      </div>
    </a>
  );
};

export default LogOutButton;
