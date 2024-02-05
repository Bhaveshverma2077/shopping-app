"use client";
import ProductTile from "@/app/Components/ProductTile";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query GetProducts {
    products {
      id
      name
      price
      imageUrl
      discountPercentage
    }
  }
`;

export default function Page() {
  const { data, loading, error } = useQuery<{
    products: [
      {
        id: string;
        name: string;
        imageUrl: string;
        price: number;
        discountPercentage: number;
      }
    ];
  }>(query);

  return (
    <>
      <div className="border border-zinc-800 w-full flex items-center justify-center py-6 rounded-lg text-3xl text-zinc-600 font-bold">
        ELECTRONICS
      </div>
      {error && <div>Something Went Wrong!</div>}
      {loading && <p>Loading...</p>}
      {!loading && !error && (
        <div className="flex flex-wrap gap-x-5 gap-y-7 justify-evenly">
          {data?.products.map((product) => (
            <ProductTile
              key={product.id}
              name={product.name}
              mrp={product.price}
              discount={product.discountPercentage}
              imgUrl={product.imageUrl}
            ></ProductTile>
          ))}
        </div>
      )}
    </>
  );
}
