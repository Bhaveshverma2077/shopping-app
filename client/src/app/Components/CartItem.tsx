import { gql, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";

import { Product } from "../types";
import { GET_PRODUCT } from "../graphql/product";
import { INC_OR_DEC_CART_ITEM } from "../graphql/user";
import DeleteIcon from "./Icons/DeleteIcon";
import { generateImageUrl } from "../utils";

const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($productId: String!) {
    removeCartItem(productId: $productId) {
      code
    }
  }
`;

const CartItem = ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  const {
    data: productData,
    loading,
    error,
  } = useQuery<{
    product: Product;
  }>(GET_PRODUCT, { variables: { productId } });

  const [incOrDecProductQuantity] = useMutation(INC_OR_DEC_CART_ITEM, {
    refetchQueries: ["GETUSER"],
  });

  const [removeCartItem] = useMutation(REMOVE_CART_ITEM, {
    refetchQueries: ["GETUSER"],
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Skeleton</p>;

  const product = productData!.product;

  return (
    <div className="border border-zinc-800  h-28 flex gap-4 items-center justify-start px-3 rounded-lg">
      <div className="flex-shrink-0 border border-zinc-800 rounded-lg overflow-hidden">
        <Image
          className="w-20 h-20 object-cover"
          height={120}
          width={120}
          src={generateImageUrl(product.imageUrls[0])}
          alt=""
        />
      </div>
      <div className="flex-shrink-0 w-[8.5rem]">
        <p className="w-[8.5rem] text-ellipsis overflow-hidden  whitespace-nowrap">
          {product.name}
        </p>
        <p className="text-gray-600 text-sm pb-2">
          {product.variants.join(" | ")}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              removeCartItem({ variables: { productId } });
            }}
            className="cursor-pointer scale-75"
          >
            <DeleteIcon></DeleteIcon>
          </button>
          <div className="w-16 flex border border-zinc-800 rounded-sm overflow-hidden">
            <a
              onClick={async () => {
                await incOrDecProductQuantity({
                  variables: { productId, inc: false },
                });
              }}
              className="cursor-pointer text-[0.9rem] bg-zinc-800 flex-1 flex justify-center items-center"
            >
              <p>-</p>
            </a>
            <div className="text-[0.9rem] flex items-center flex-1 justify-center">
              <p>{quantity}</p>
            </div>
            <a
              onClick={async () => {
                await incOrDecProductQuantity({
                  variables: { productId, inc: true },
                });
              }}
              className="cursor-pointer text-[0.9rem] bg-zinc-800 flex items-center flex-1 justify-center"
            >
              <p>+</p>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-end w-full">
        <p>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItem;
