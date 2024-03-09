"use client";
import ProductTile from "@/app/Components/ProductTile";
import { gql, useQuery } from "@apollo/client";
import { usePathname } from "next/navigation";

const GET_PRODUCTS = gql`
  query ProductsByString($searchString: String!) {
    productsByString(searchString: $searchString) {
      id
      name
      price
      discountPercentage
      imageUrls
    }
  }
`;

export default function Page() {
  const path = usePathname();
  const searchString = path.split("/")[path.split("/").length - 1];

  const { data, loading, error } = useQuery<{
    productsByString: Array<{
      id: string;
      name: string;
      imageUrls: Array<string>;
      price: number;
      discountPercentage: number;
    }>;
  }>(GET_PRODUCTS, { variables: { searchString } });

  return (
    <>
      <div className="border border-zinc-800 w-full flex items-center justify-center py-6 rounded-lg text-2xl px-2 text-center xs:text-3xl text-zinc-600 font-bold">
        Showing results for "{searchString}"
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-7 justify-evenly">
        {data?.productsByString.length === 0 && (
          <p className="text-zinc-400">No Products Found</p>
        )}
        {data?.productsByString.map((product) => (
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
    </>
  );
}
