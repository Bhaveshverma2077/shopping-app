"use client";

import { useReducer } from "react";

import BookIcon from "./Icons/BookIcon";
import Logo from "./Logo";
import Cart from "./Cart";
import ShoppingCartIcon from "./Icons/ShoppingCartIcon";
import Orders from "./Orders";

const CartAndOrdersLayout = () => {
  const [cartOrOrders, changeCartOrOrders] = useReducer(
    (state: React.ReactNode, action: { type: "cart" | "orders" }) => {
      if (action.type === "cart") {
        return <Cart></Cart>;
      }
      return <Orders></Orders>;
    },
    <Cart></Cart>
  );

  return (
    <>
      <div className="flex items-center justify-between gap-2 pb-4 ">
        <Logo></Logo>
        <div className="flex gap-2">
          <div
            onClick={() => {
              changeCartOrOrders({ type: "cart" });
            }}
            className="border bg-zinc-900 border-zinc-800 p-2 rounded-lg"
          >
            <div className="scale-[0.65]">
              <ShoppingCartIcon></ShoppingCartIcon>
            </div>
          </div>
          <div
            onClick={() => {
              changeCartOrOrders({ type: "orders" });
            }}
            className="border bg-zinc-900 border-zinc-800 p-2 rounded-lg"
          >
            <div className="scale-[0.65]">
              <BookIcon></BookIcon>
            </div>
          </div>
        </div>
      </div>
      {cartOrOrders}
    </>
  );
};

export default CartAndOrdersLayout;
