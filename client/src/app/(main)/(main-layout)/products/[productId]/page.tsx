"use client";
import ChevronLeftIcon from "@/app/Components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/app/Components/Icons/ChevronRightIcon";
import ShoppingCartIcon from "@/app/Components/Icons/ShoppingCartIcon";
import SunIcon from "@/app/Components/Icons/SunIcon";
import ProductTile from "@/app/Components/ProductTile";
import { useRef } from "react";

export default function Page() {
  const imageRef = useRef<HTMLDivElement>(null);
  return (
    <div>
      <div className="flex gap-20 pb-6">
        <div className="relative rounded-lg overflow-hidden w-1/2">
          <img
            className="object-cover h-[28rem]"
            src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fkud2gmc6%2Fproduction%2Fb0cf088c75287a4030e8630acd1aa690e6059a8a-1200x675.jpg&w=1920&q=75"
            alt=""
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
              <ChevronLeftIcon></ChevronLeftIcon>
            </button>
            <button className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
              <ChevronRightIcon></ChevronRightIcon>
            </button>
          </div>
        </div>
        <div className="w-1/2">
          <p className="">Samsung</p>
          <p className="text-4xl">Galaxy S23 Ultra 512Gb</p>
          <p className="pb-10">Rating: 4.7</p>
          <p className="h-40 text-ellipsis overflow-hidden ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
            amet, ab incidunt minus voluptatibus eligendi animi, non enim ipsam
            suscipit sequi tempora sint fuga cupiditate deleniti consequatur
            sunt accusamus quae.
          </p>
          <div className="py-4">
            <div className="flex items-start gap-1">
              <span className="text-[0.8rem] line-through text-zinc-500">
                $1199.99
              </span>
              <span>$</span>
              <span className="text-[2rem] leading-none">899</span>
              <span>99</span>
              <div className="bg-yellow-600 px-4 py-0.5 rounded-md mx-2">
                15%
              </div>
            </div>
          </div>
          <button className="flex gap-2 items-center border border-gray-900 bg-gray-900 py-4 px-8 rounded-lg">
            <p className="text-[0.7rem]">ADD TO CART</p>
            <ShoppingCartIcon></ShoppingCartIcon>
          </button>
        </div>
      </div>
      <div
        ref={imageRef}
        className="flex scroll-smooth scrollbar-hide overflow-x-scroll  snap-x w-1/2  gap-2"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <div className="relative rounded-lg snap-center overflow-hidden flex-shrink-0 w-[6rem] h-[6rem] border-white border-2">
            <img
              onClick={() => {
                const firstElementInViewIndex = Math.round(
                  imageRef.current?.scrollLeft! / 95
                );
                imageRef.current?.scrollBy({
                  left: -190 + 95 * (i - firstElementInViewIndex),
                });
              }}
              className="object-cover h-[6rem] w-[6rem]"
              src="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fkud2gmc6%2Fproduction%2Fb0cf088c75287a4030e8630acd1aa690e6059a8a-1200x675.jpg&w=1920&q=75"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
