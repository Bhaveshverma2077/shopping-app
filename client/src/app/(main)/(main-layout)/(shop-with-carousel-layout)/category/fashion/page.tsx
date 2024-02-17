"use client";

import { GET_PRODUCTS } from "@/app/graphql/product";
import { useQuery } from "@apollo/client";

import ProductTile from "@/app/Components/ProductTile";

export default function Page() {
  const { data, loading, error } = useQuery<{
    products: Array<{
      id: string;
      name: string;
      imageUrls: Array<string>;
      price: number;
      discountPercentage: number;
    }>;
  }>(GET_PRODUCTS, { variables: { typeName: "fashion" } });

  return (
    <>
      <div className="border border-zinc-800 w-full flex items-center justify-center py-6 rounded-lg text-3xl text-zinc-600 font-bold">
        FASHION
      </div>
      {error && <div>Something Went Wrong!</div>}
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <div className="flex flex-wrap gap-x-5 gap-y-7 justify-evenly">
          {data?.products.map((product) => (
            <ProductTile
              id={product.id}
              key={product.id}
              name={product.name}
              mrp={product.price}
              discount={product.discountPercentage}
              imgUrl={product.imageUrls[0]}
            ></ProductTile>
          ))}
        </div>
      )}
    </>
  );
}
