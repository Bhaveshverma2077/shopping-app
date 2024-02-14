import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";

import DeleteIcon from "./Icons/DeleteIcon";
import { Product } from "../types";

const GET_PRODUCT = gql`
  query ($productId: String!) {
    product(id: $productId) {
      id
      companyName
      description
      name
      price
      rating
      imageUrl
      discountPercentage
    }
  }
`;

const ADD_OR_REMOVE_CART_ITEM = gql`
  mutation IncCartItem($productId: String!, $inc: Boolean!) {
    incOrDecCartItem(productId: $productId, inc: $inc) {
      quantity
    }
  }
`;

const CartItem = ({
  productId,
  quantity,
  refetchCart,
}: {
  productId: string;
  quantity: number;
  refetchCart: () => any;
}) => {
  const {
    data: productData,
    loading,
    error,
  } = useQuery<{
    product: Product;
  }>(GET_PRODUCT, { variables: { productId } });

  const [incOrDecProductQuantity] = useMutation(ADD_OR_REMOVE_CART_ITEM, {
    refetchQueries: ["GETUSER"],
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Skeleton</p>;

  const product = productData!.product;

  return (
    <div className="border border-zinc-800  h-28 flex gap-4 items-center justify-start px-3 rounded-lg">
      <div className="flex-shrink-0 border border-zinc-800 rounded-lg overflow-hidden">
        <img
          className="w-20 h-20 object-cover"
          src={`https://firebasestorage.googleapis.com/v0/b/shopping-app-9f7fc.appspot.com/o/${product.imageUrl}?alt=media`}
          alt=""
        />
      </div>
      <div className="flex-shrink-0 w-[8.5rem]">
        <p className="w-[8.5rem] text-ellipsis overflow-hidden  whitespace-nowrap">
          {product.name}
        </p>
        <p className="text-gray-600 text-sm pb-2">Pink | 256 GB</p>
        <div className="flex gap-2">
          <a className="cursor-pointer scale-75">
            <DeleteIcon></DeleteIcon>
          </a>
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
        <p>
          $
          {(
            product.price -
            (product.discountPercentage * product.price) / 100
          ).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
