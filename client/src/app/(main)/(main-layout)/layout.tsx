"use client";

import CartAndOrdersLayout from "@/app/Components/CartAndOrdersLayout";
import Logo from "@/app/Components/Logo";
import Nav from "@/app/Components/Nav";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [showShopOrCart, setShowShopOrCart] = useState<"shop" | "cart">("shop");
  return (
    <div className="w-full px-12 py-6 flex gap-6">
      <div className="flex lg:w-[73%]  w-[100%] ">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex gap-2 justify-between">
            <Logo></Logo>
            <Nav
              showShopOrCartButton={showShopOrCart}
              onShopOrCartClicked={setShowShopOrCart}
            ></Nav>
          </div>
          {/* show cart in main content only when screen size is smaller than cart and cart is selected  */}
          {/* always show cart on right side and shop on left when screen size is larger than lg */}
          {showShopOrCart === "cart" ? (
            <>
              <div className="flex-col gap-6 w-full hidden lg:flex">
                {children}
              </div>
              <div className="lg:hidden">
                <CartAndOrdersLayout hideLogo={true}></CartAndOrdersLayout>
              </div>
            </>
          ) : (
            children
          )}
        </div>
      </div>
      <div className="lg:block hidden w-[27%] border border-zinc-900 p-4 rounded-lg">
        <CartAndOrdersLayout hideLogo={false}></CartAndOrdersLayout>
      </div>
    </div>
  );
}
