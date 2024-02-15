"use client";
import ChevronLeftIcon from "@/app/Components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/app/Components/Icons/ChevronRightIcon";
import TopOffersTile from "@/app/Components/TopOffersTile";
import { generateImageUrl } from "@/app/utils";
import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";

const GET_TOP_OFFERS = gql`
  query TopOffers {
    topOffers {
      title
      link
      imageUrl
    }
  }
`;

export default function Page() {
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useQuery<{
    topOffers: Array<{ title: string; link: string; imageUrl: string }>;
  }>(GET_TOP_OFFERS);
  return (
    <>
      <div className="flex items-center justify-between">
        <p>Top Offers just for You</p>
        <div className="flex items-center">
          <p>View more</p>
          <ChevronRightIcon></ChevronRightIcon>
        </div>
      </div>
      <div className="relative">
        <div
          onClick={() => {
            scrollableDivRef.current?.scrollBy({ left: -300 });
          }}
          className="absolute p-2 rounded-full flex justify-center items-center bg-black top-[50%] translate-y-[-50%] left-1 z-10"
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </div>
        <div
          onClick={() => {
            scrollableDivRef.current?.scrollBy({ left: 300 });
          }}
          className="absolute p-2 rounded-full flex justify-center items-center bg-black top-[50%] translate-y-[-50%] right-1 z-10"
        >
          <ChevronRightIcon></ChevronRightIcon>
        </div>
        <div
          ref={scrollableDivRef}
          className="scroll-smooth snap-x relative pb-2 flex gap-6 justify-between overflow-x-auto scrollbar-hide items-center"
        >
          {data?.topOffers.map((topOfer) => (
            <TopOffersTile
              imageUrl={generateImageUrl(topOfer.imageUrl)}
              text={topOfer.title}
            ></TopOffersTile>
          ))}
        </div>
      </div>
    </>
  );
}
