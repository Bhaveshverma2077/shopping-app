"use client";
import { gql, useQuery } from "@apollo/client";
import CartItem from "./CartItem";
import BookIcon from "./Icons/BookIcon";
import CreditCardIcon from "./Icons/CreditCardIcon";
import Logo from "./Logo";
import OrderItem from "./OrderItem";

const GET_USER_CART = gql`
  query GETUSERCART {
    user {
      userName
      cart {
        productId
        quantity
        pricePerUnit
      }
    }
  }
`;

// const GET_PRODUCTS_BY_IDS = gql`
//   query ($productIds: [String!]!) {
//     productsByIds(productIds: $productIds) {
//       id
//       companyName
//       description
//       name
//       price
//       rating
//       imageUrl
//       discountPercentage
//     }
//   }
// `;

const Cart = () => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch,
  } = useQuery<{
    user: {
      cart: Array<{
        productId: string;
        quantity: number;
        pricePerUnit: number;
      }>;
    };
  }>(GET_USER_CART);
  // const {
  //   data: cartData,
  //   loading,
  //   error,
  // } = useQuery<{
  //   productsByIds: Array<{
  //     id: string;
  //     companyName: string;
  //     description: string;
  //     name: string;
  //     price: number;
  //     rating: number;
  //     imageUrl: string;
  //     discountPercentage: number;
  //   }>;
  // }>(GET_PRODUCTS_BY_IDS, {
  //   variables: {
  //     productIds: userData?.user.cart.map((cartItem) => cartItem.productId),
  //   },
  //   skip: userLoading,
  // });

  const subTotal = userData?.user.cart.reduce(
    (acc, value) => acc + value.pricePerUnit * value.quantity,
    0
  );

  return (
    <>
      <div className="max-h-[50rem] customized-scrollbar overflow-hidden overflow-y-auto">
        {userData?.user ? (
          userData?.user.cart.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              refetchCart={refetch}
              {...cartItem}
            ></CartItem>
          ))
        ) : (
          <p>Empty</p>
        )}
      </div>
      <br />
      <div className="px-2">
        <div className="w-full h-[1px] bg-zinc-700" />
      </div>
      <br />
      <div className="flex justify-between">
        <p>SubTotal</p>
        <p>${subTotal?.toFixed(2)}</p>
      </div>
      <div className="text-[0.7rem] text-zinc-500 flex justify-between">
        <p className="">Tax</p>
        <p>${subTotal && (subTotal / 20).toFixed(2)}</p>
      </div>
      <br />
      <div className="px-2">
        <div className="border-zinc-700 text-[5rem] border-t-2 decoration-dashed border-dashed " />
      </div>
      <br />
      <div className=" flex justify-between">
        <p className="">Total</p>
        <p>${subTotal && (subTotal / 20 + subTotal).toFixed(2)}</p>
      </div>
      <br />
      <button className="bg-blue-600 hover:bg-blue-700 rounded-lg w-full py-2">
        PROCEED TO CHECKOUT
      </button>
    </>
  );
};

export default Cart;
