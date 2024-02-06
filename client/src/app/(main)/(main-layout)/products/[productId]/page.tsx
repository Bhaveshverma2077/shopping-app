"use client";
import ChevronLeftIcon from "@/app/Components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/app/Components/Icons/ChevronRightIcon";
import ShoppingCartIcon from "@/app/Components/Icons/ShoppingCartIcon";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useParams } from "next/navigation";
import { useRef } from "react";

const query = gql`
  query ExampleQuery($productId: String!) {
    product(id: $productId) {
      name
      companyName
      description
      imageUrl
      price
      rating
      discountPercentage
    }
  }
`;

export default function Page() {
  const imageRef = useRef<HTMLDivElement>(null);
  const params = useParams<{ productId: string }>();
  const { data, loading, error } = useQuery<{
    product: {
      name: string;
      description: string;
      imageUrl: string;
      price: number;
      rating: number;
      companyName: string;
      discountPercentage: number;
    };
  }>(query, {
    variables: { productId: params.productId },
  });
  return (
    <div>
      <div className="flex gap-20 pb-6">
        <div className="relative rounded-lg overflow-hidden w-1/2">
          <img
            className="object-cover h-[28rem] w-full"
            src={`https://firebasestorage.googleapis.com/v0/b/shopping-app-9f7fc.appspot.com/o/${data?.product.imageUrl}?alt=media`}
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
          <p className="">{data?.product.companyName}</p>
          <p className="text-4xl">{data?.product.name}</p>
          <p className="pb-10">Rating: {data?.product.rating}</p>
          <p className="h-40 text-ellipsis overflow-hidden ">
            {data?.product.description}
          </p>
          <div className="py-4">
            <div className="flex items-start gap-1">
              <span className="text-[0.8rem] line-through text-zinc-500">
                ${data?.product.price}
              </span>
              <span>$</span>
              <span className="text-[2rem] leading-none">
                {(
                  data?.product.price! -
                  (data?.product.discountPercentage! * data?.product.price!) /
                    100
                ).toFixed(2)}
              </span>
              <span>99</span>
              <div className="bg-yellow-600 px-4 py-0.5 rounded-md mx-2">
                {data?.product.discountPercentage}%
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
