"use client";

import { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

import ChevronLeftIcon from "@/app/Components/Icons/ChevronLeftIcon";
import ChevronRightIcon from "@/app/Components/Icons/ChevronRightIcon";
import ShoppingCartIcon from "@/app/Components/Icons/ShoppingCartIcon";
import { GET_PRODUCT } from "@/app/graphql/product";
import { INC_OR_DEC_CART_ITEM } from "@/app/graphql/user";
import { CartItemType, Product } from "@/app/types";
import { generateImageUrl } from "@/app/utils";

export default function Page() {
  const router = useRouter();
  const imageRef = useRef<HTMLDivElement>(null);
  const params = useParams<{ productId: string }>();

  const { data, loading } = useQuery<{
    product: Product;
  }>(GET_PRODUCT, {
    variables: { productId: params.productId },
  });
  const [incrOrDecProductQuantity] = useMutation<{
    incOrDecCartItem: {
      success: boolean;
      code: string;
      message: string;
      data: CartItemType;
    };
  }>(INC_OR_DEC_CART_ITEM, {
    refetchQueries: ["GETUSER"],
  });

  const [selectedImageIndex, updateSelectedImageIndex] = useState<number>(0);

  if (loading)
    return (
      <div className="text-zinc-500 py-6 flex justify-center">
        <p>Loading..."</p>
      </div>
    );
  if (!data?.product)
    return (
      <div className="text-zinc-500 py-6 flex justify-center">
        <p>Product does not exist with the ID specified "{params.productId}"</p>
      </div>
    );

  const finalPrice =
    data?.product.price! -
    (data?.product.discountPercentage! * data?.product.price!) / 100;

  return (
    <div>
      <div className="flex  flex-col md:flex-row  gap-20 pb-6">
        <div className="relative md:h-[28rem] h-[35rem] rounded-lg overflow-hidden   md:w-1/2">
          {data?.product.imageUrls.map((imageUrl, i) => (
            <img
              style={{ left: `${(i - selectedImageIndex) * 100}%` }}
              className={`transition-[left] absolute left-[${
                (i - selectedImageIndex) * 100 + "%"
              }] object-cover md:h-[28rem] h-[35rem] w-full`}
              src={generateImageUrl(imageUrl)}
              alt=""
            />
          ))}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={() => {
                updateSelectedImageIndex(
                  (index) => (index - 1) % data?.product.imageUrls.length!
                );
              }}
              className="bg-gray-900 border border-gray-800 p-4 rounded-lg"
            >
              <ChevronLeftIcon></ChevronLeftIcon>
            </button>
            <button
              onClick={() => {
                updateSelectedImageIndex(
                  (index) => (index + 1) % data?.product.imageUrls.length!
                );
              }}
              className="bg-gray-900 border border-gray-800 p-4 rounded-lg"
            >
              <ChevronRightIcon></ChevronRightIcon>
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <p className="">{data?.product.companyName}</p>
          <p className="text-4xl">{data?.product.name}</p>
          <p className="pb-8">Rating: {data?.product.rating}</p>
          <p className="pb-2 text-zinc-500">
            {data?.product.variants.join(" | ")}
          </p>
          <p className="h-40 text-ellipsis overflow-hidden ">
            {data?.product.description.length! > 250
              ? `${data?.product.description.substring(0, 250)}...`
              : data?.product.description}
          </p>
          <div className="py-4">
            <div className="flex items-start gap-1">
              <span className="text-[0.8rem] line-through text-zinc-500">
                ${data?.product.price}
              </span>
              <span>$</span>
              <span className="text-[2rem] leading-none">
                {Math.floor(finalPrice)}
              </span>
              <span>{Math.floor((finalPrice % 1) * 100)}</span>
              <div className="bg-yellow-600 px-4 py-0.5 rounded-md mx-2">
                {data?.product.discountPercentage}%
              </div>
            </div>
          </div>
          <button
            onClick={async () => {
              const res = await incrOrDecProductQuantity({
                variables: { productId: params.productId, inc: true },
              });
              if (res.data?.incOrDecCartItem.code === "UNAUTHENTICATED") {
                router.push("/auth");
              }
            }}
            className="flex gap-2 items-center border border-gray-900 bg-gray-900 py-4 px-8 rounded-lg"
          >
            <p className="text-[0.7rem]">ADD TO CART</p>
            <ShoppingCartIcon></ShoppingCartIcon>
          </button>
        </div>
      </div>
      <div
        ref={imageRef}
        className="flex scroll-smooth scrollbar-hide overflow-x-scroll snap-x w-1/2  gap-2"
      >
        {data?.product.imageUrls.map((imageUrl, i) => (
          <div
            key={imageUrl}
            className={`relative rounded-lg snap-center overflow-hidden flex-shrink-0 w-[6rem] h-[6rem] ${
              selectedImageIndex === i ? "border-white" : "border-black"
            } border-2`}
          >
            <img
              onClick={() => {
                updateSelectedImageIndex(i);
                const firstElementInViewIndex = Math.round(
                  imageRef.current?.scrollLeft! / 95
                );
                imageRef.current?.scrollBy({
                  left: -190 + 95 * (i - firstElementInViewIndex),
                });
              }}
              className="object-cover h-[6rem] w-[6rem]"
              src={generateImageUrl(imageUrl)}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
