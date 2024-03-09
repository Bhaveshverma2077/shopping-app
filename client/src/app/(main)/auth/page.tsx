"use client";

import { useRef, useState } from "react";

import EmailIcon from "@/app/Components/Icons/EmailIcon";
import LockIcon from "@/app/Components/Icons/LockIcon";
import UserIcon from "@/app/Components/Icons/UserIcon";
import Logo from "@/app/Components/Logo";

export default function Page() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const userNameFieldRef = useRef<HTMLInputElement>(null);
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const passwordFieldRef = useRef<HTMLInputElement>(null);
  const confirmPasswordFieldRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<null | string>(null);

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          if (
            !isLogin &&
            passwordFieldRef.current?.value !==
              confirmPasswordFieldRef.current?.value
          ) {
            setError("Passwords do not match");
            return;
          }
          fetch("http://localhost:5050/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userName: userNameFieldRef.current?.value,
              email: emailFieldRef.current?.value,
              password: passwordFieldRef.current?.value,
              login: isLogin,
            }),
          })
            .then((data) => data.json())
            .then((data) => {
              const {
                token,
                error,
              }: { token: string | undefined; error: string | undefined } =
                JSON.parse(data);
              if (error) {
                setError(error);
                return;
              }
              localStorage.setItem("token", token!);
              window.location.replace("/");
            })
            .catch((_) => {
              setError("Something went wrong!");
            });
        }}
        className="bg-zinc-900 flex flex-col gap-4 items-center justify-center rounded-lg p-4 sm:p-8 shadow-lg shadow-gray-800"
      >
        <Logo></Logo>
        <p className="text-[2rem]">Welcome back</p>
        {isLogin && (
          <p className="cursor-pointer text-[0.8rem] text-gray-400 pb-8">
            Don't have an account yet?
            <span
              onClick={() => {
                setIsLogin(false);
              }}
              className="text-white font-semibold"
            >
              {" "}
              Sign Up
            </span>
          </p>
        )}
        {!isLogin && (
          <p className="cursor-pointer text-[0.8rem] text-gray-400 pb-8">
            Already have an account?
            <span
              onClick={() => {
                setIsLogin(true);
              }}
              className="text-white font-semibold"
            >
              {" "}
              Login Up
            </span>
          </p>
        )}
        {!isLogin && (
          <div className="relative">
            <input
              ref={userNameFieldRef}
              className="p-1 pl-10 rounded-lg outline-none bg-black"
              type="text"
              placeholder="Username"
              name=""
              id=""
            />
            <div className="absolute top-1 left-1 scale-75">
              <UserIcon></UserIcon>
            </div>
          </div>
        )}
        <input type="hidden" />
        <div className="relative">
          <input
            ref={emailFieldRef}
            className="p-1 pl-10 rounded-lg outline-none bg-black"
            type="text"
            placeholder="Email"
            name=""
            id=""
          />
          <div className="absolute top-1 left-1 scale-75">
            <EmailIcon></EmailIcon>
          </div>
        </div>
        <div className="relative">
          <input
            ref={passwordFieldRef}
            className="p-1 pl-10 rounded-lg outline-none bg-black"
            placeholder="Password"
            type="password"
            name=""
            id=""
          />
          <div className="absolute top-1 left-1 scale-75">
            <LockIcon></LockIcon>
          </div>
        </div>

        {!isLogin && (
          <div className="relative">
            <input
              ref={confirmPasswordFieldRef}
              className="p-1 pl-10 rounded-lg outline-none bg-black"
              type="password"
              placeholder="Confirm Password"
              name=""
              id=""
            />
            <div className="absolute top-1 left-1 scale-75">
              <div></div>
            </div>
          </div>
        )}
        <button className="bg-gray-800 w-full py-2 rounded-lg" type="submit">
          {isLogin ? "Log In" : "Sign Up"}
        </button>
        <div className="text-red-700 w-64 text-center font-bold text-[0.7rem]">
          {error}
        </div>
      </form>
    </div>
  );
}
