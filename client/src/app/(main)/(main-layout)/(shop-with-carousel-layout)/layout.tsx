"use client";
import ChevronLeftIcon from "@/app/Components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/app/Components/Icons/ChevronRightIcon";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useReducer, useRef, useState } from "react";

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

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [selectedCarouselItemIndex, updateSelectedCarouselItemIndex] =
    useState<number>(0);

  useEffect(() => {
    window.addEventListener("resize", forceUpdate);
    return () => {
      window.removeEventListener("resize", forceUpdate);
    };
  }, []);

  useEffect(() => {
    scrollDivRef.current?.scrollTo({
      left: selectedCarouselItemIndex * imageContainerRef.current?.clientWidth!,
    });
  }, [selectedCarouselItemIndex]);

  const { data, loading, error } = useQuery<{
    carouselItems: Array<{
      id: string;
      title: string;
      subtitle: string;
      imageUrl: string;
      link: string;
    }>;
  }>(query);

  return (
    <>
      <div
        ref={imageContainerRef}
        className="relative flex  flex-col justify-end gap-1 p-2 transition-all bg-cover hover:bg-[100%] bg-[url(http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fkud2gmc6%2Fproduction%2F8facabde3982fd3d4839f4695235c3747e771088-5966x3977.jpg&w=1200&q=75)] w-full h-64"
      >
        {!loading && (
          <div
            ref={scrollDivRef}
            className="absolute scrollbar-hide scroll-smooth snap-x overflow-x-scroll flex top-0 left-0"
          >
            {data?.carouselItems.map((carouselItem) => (
              <img
                key={carouselItem.id}
                width={imageContainerRef.current?.clientWidth}
                className="object-cover h-64 object-center  flex-shrink-0 snap-center"
                src={carouselItem.imageUrl}
                alt=""
              />
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
          <a className="z-10 rounded-lg border flex items-center border-zinc-800 bg-zinc-900 py-1 px-2">
            <ChevronLeftIcon></ChevronLeftIcon>
          </a>
          <a className="z-10 rounded-lg border flex items-center border-zinc-800 bg-zinc-900 py-1 px-2">
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
