"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import Image from "next/image";

import ChevronRightIcon from "@/app/Components/Icons/ChevronRightIcon";
import { generateImageUrl } from "@/app/utils";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query getCarouselItems {
    carouselItems {
      id
      title
      subtitle
      imageUrl
      link
    }
  }
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const scrollDivRef = useRef<HTMLDivElement>(null);

  const [selectedCarouselItemIndex, updateSelectedCarouselItemIndex] =
    useState<number>(0);

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    window.addEventListener("resize", forceUpdate);
    return () => {
      window.removeEventListener("resize", forceUpdate);
    };
  }, []);

  const { data, loading, error } = useQuery<{
    carouselItems: Array<{
      id: string;
      title: string;
      subtitle: string;
      imageUrl: string;
      link: string;
    }>;
  }>(query);

  useEffect(() => {
    scrollDivRef.current?.scrollTo({
      left: selectedCarouselItemIndex * imageContainerRef.current?.clientWidth!,
    });
    const timer = setInterval(() => {
      updateSelectedCarouselItemIndex(
        (index) => (index + 1) % (data?.carouselItems.length ?? 2)
      );
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [selectedCarouselItemIndex]);

  return (
    <>
      <div
        ref={imageContainerRef}
        className="relative flex flex-col justify-end gap-1 p-3 transition-all bg-cover hover:bg-[100%] w-full h-64"
      >
        {!loading && (
          <div
            ref={scrollDivRef}
            className="absolute scrollbar-hide scroll-smooth snap-x overflow-x-scroll flex top-0 left-0"
          >
            {data?.carouselItems.map((carouselItem, i) => (
              <Image
                key={carouselItem.id}
                width={imageContainerRef.current?.clientWidth ?? 0}
                height={256}
                alt={`carousel image ${i + 1}`}
                className="object-cover h-64 object-center flex-shrink-0 snap-center"
                src={generateImageUrl(carouselItem.imageUrl)}
              ></Image>
            ))}
          </div>
        )}
        <p className="text-2xl z-10">
          {!loading && data?.carouselItems[selectedCarouselItemIndex].title}
        </p>
        <p className="text-sm z-10">
          {!loading && data?.carouselItems[selectedCarouselItemIndex].subtitle}
        </p>
        <div className="flex gap-2">
          <a
            href={data?.carouselItems[selectedCarouselItemIndex].link}
            className="z-10 rounded-lg flex gap-2 items-center justify-center border border-zinc-800 bg-zinc-900 py-1 px-4"
          >
            <p>Know more</p>
            <ChevronRightIcon></ChevronRightIcon>
          </a>
        </div>
      </div>
      <div className="flex gap-1 items-center justify-center">
        {data?.carouselItems.map((carouselItem, i) => (
          <div
            key={carouselItem.id}
            onClick={() => {
              updateSelectedCarouselItemIndex(i);
            }}
            className={`${
              i === selectedCarouselItemIndex ? "bg-white" : ""
            } rounded-full w-2 h-2 border border-white`}
          ></div>
        ))}
      </div>
      {children}
    </>
  );
}
