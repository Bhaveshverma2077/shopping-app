"use client";
import { gql, useQuery } from "@apollo/client";
import CartItem from "./CartItem";
import BookIcon from "./Icons/BookIcon";
import CreditCardIcon from "./Icons/CreditCardIcon";
import Logo from "./Logo";

const GET_USER = gql`
  query GETUSER {
    user {
      cart {
        productId
        quantity
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
  } = useQuery<{
    user: { cart: Array<{ productId: string; quantity: number }> };
  }>(GET_USER);
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

  return (
    <>
      <div className="flex items-center justify-between gap-2 pb-4 ">
        <Logo></Logo>
        <div className="flex gap-2">
          <div className="border bg-zinc-900 border-zinc-800 p-2 rounded-lg">
            <div className="scale-[0.65]">
              <BookIcon></BookIcon>
            </div>
          </div>
          <div className="border bg-zinc-900 border-zinc-800 p-2 rounded-lg">
            <div className="scale-[0.65]">
              <CreditCardIcon></CreditCardIcon>
            </div>
          </div>
        </div>
      </div>
      {userData?.user.cart.map((cartItem) => (
        <CartItem {...cartItem}></CartItem>
      ))}{" "}
    </>
  );
};

export default Cart;
