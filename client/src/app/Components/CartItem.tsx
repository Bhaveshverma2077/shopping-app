import gql from "graphql-tag";
import BookIcon from "./Icons/BookIcon";
import CreditCardIcon from "./Icons/CreditCardIcon";
import DeleteIcon from "./Icons/DeleteIcon";
import Logo from "./Logo";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

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
    product: {
      id: string;
      companyName: string;
      description: string;
      name: string;
      price: number;
      rating: number;
      imageUrl: string;
      discountPercentage: number;
    };
  }>(GET_PRODUCT, { variables: { productId } });

  const ADD_CART_ITEM = gql`
    mutation IncCartItem($productId: String!, $inc: Boolean!) {
      incOrDecCartItem(productId: $productId, inc: $inc) {
        quantity
      }
    }
  `;

  const [incrProductQuantity] = useMutation(ADD_CART_ITEM);
  const [updatedquantity, setUpdatedQuantity] = useState(quantity);
  return (
    <div className="border border-zinc-800  h-28 flex gap-4 items-center justify-center rounded-lg">
      {/* <p className="text-zinc-700 text-[0.8rem]">Your Cart is Empty!</p> */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <img
          className="w-20 h-20 object-cover"
          src={`https://firebasestorage.googleapis.com/v0/b/shopping-app-9f7fc.appspot.com/o/${productData?.product.imageUrl}?alt=media`}
          alt=""
        />
      </div>
      <div>
        <p>{productData?.product.name}</p>
        <p className="text-gray-600 text-sm pb-2">Pink | 256 GB</p>
        <div className="flex gap-2">
          <a className="cursor-pointer scale-75">
            <DeleteIcon></DeleteIcon>
          </a>
          <div className="w-16 flex border border-zinc-800 rounded-sm overflow-hidden">
            <a className="cursor-pointer text-[0.9rem] bg-zinc-800 flex-1 flex justify-center items-center">
              <p>-</p>
            </a>
            <div className="text-[0.9rem] flex items-center flex-1 justify-center">
              <p>{updatedquantity}</p>
            </div>
            <a
              onClick={async () => {
                const { data } = await incrProductQuantity({
                  variables: { productId, inc: true },
                });
                setUpdatedQuantity(data.incOrDecCartItem.quantity);
              }}
              className="cursor-pointer text-[0.9rem] bg-zinc-800 flex items-center flex-1 justify-center"
            >
              <p>+</p>
            </a>
          </div>
        </div>
      </div>
      <div>${productData?.product.price}</div>
    </div>
  );
};

export default CartItem;
