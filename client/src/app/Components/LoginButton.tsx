import Link from "next/link";

const LoginButton = () => {
  return (
    <Link
      href={"/auth"}
      className="relative border gap-2 group border-zinc-900 flex items-center justify-center p-2 rounded-lg"
    >
      <div className="z-20 absolute h-5 w-40 top-10 right-0"></div>
      <p className="text-[0.8rem]">Log In</p>
    </Link>
  );
};

export default LoginButton;
