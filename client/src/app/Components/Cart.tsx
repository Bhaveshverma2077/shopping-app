"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import CartItem from "./CartItem";
import { GET_USER } from "../graphql/user";

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
        discountPerUnit: number;
      }>;
    };
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

  const PLACE_ORDER = gql`
    mutation PlaceOrder {
      placeOrder {
        id
      }
    }
  `;

  const [placeOrder, { data }] = useMutation(PLACE_ORDER, {
    refetchQueries: ["GETUSER"],
  });

  if (!userData?.user || userData.user.cart.length === 0) {
    // if not logged in
    return (
      <div className="border border-zinc-800  h-28 flex gap-4 items-center justify-center px-3 rounded-lg">
        <p className="text-zinc-600">Cart is empty!</p>
      </div>
    );
  }

  const taxPercent = 5;
  const subTotal = userData.user.cart.reduce(
    (acc, value) => acc + value.pricePerUnit * value.quantity,
    0
  );
  const totalDiscount = userData.user.cart.reduce(
    (acc, cartItem) => cartItem.discountPerUnit * cartItem.quantity + acc,
    0
  );
  const priceIncludingDiscount = subTotal - totalDiscount;
  const finalPriceIncludingDiscountAndTax =
    priceIncludingDiscount + (priceIncludingDiscount * taxPercent) / 100;

  return (
    <>
      <div className="max-h-[50rem] customized-scrollbar overflow-hidden overflow-y-auto">
        {userData.user.cart.map((cartItem) => (
          <CartItem
            key={cartItem.productId}
            refetchCart={refetch}
            {...cartItem}
          ></CartItem>
        ))}
      </div>
      {subTotal !== 0 && (
        <>
          <br />
          <div className="px-2">
            <div className="w-full h-[1px] bg-zinc-700" />
          </div>
          <br />
          <div className="flex justify-between">
            <p>SubTotal</p>
            <p>${subTotal.toFixed(2)}</p>
          </div>
          <div className="text-[0.7rem] text-zinc-500 flex justify-between">
            <p className="">Tax</p>
            <p>+ ${((priceIncludingDiscount * taxPercent) / 100).toFixed(2)}</p>
          </div>
          <div className="text-[0.7rem] text-zinc-500 flex justify-between">
            <p className="">Discount</p>
            <p>- ${totalDiscount}</p>
          </div>
          <br />
          <div className="px-2">
            <div className="border-zinc-700 text-[5rem] border-t-2 decoration-dashed border-dashed " />
          </div>
          <br />
          <div className=" flex justify-between">
            <p className="">Total</p>
            <p className="text-[2.2rem]">
              ${finalPriceIncludingDiscountAndTax.toFixed(2)}
            </p>
          </div>
          <br />
          <button
            onClick={() => {
              placeOrder();
            }}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg w-full py-2"
          >
            PROCEED TO CHECKOUT
          </button>
        </>
      )}
    </>
  );
};

export default Cart;
