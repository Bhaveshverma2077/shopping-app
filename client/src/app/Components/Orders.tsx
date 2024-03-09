import { useQuery } from "@apollo/client";

import { GET_USER } from "../graphql/user";
import OrderItem from "./OrderItem";
import type { CartItemType, OrderItemType } from "../types";

const Orders = () => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery<{
    user: {
      cart: Array<CartItemType>;
      orders: Array<OrderItemType>;
    };
  }>(GET_USER);

  if (!userData?.user || userData.user.orders.length === 0) {
    // if not logged in
    return (
      <div className="border border-zinc-800  h-28 flex gap-4 items-center justify-center px-3 rounded-lg">
        <p className="text-zinc-600">No Orders!</p>
      </div>
    );
  }

  const orders = userData.user.orders;
  console.log(orders);

  return (
    <div className="max-h-[50rem] customized-scrollbar overflow-hidden overflow-y-auto">
      {orders.map((orderItemData) => (
        <OrderItem
          key={orderItemData.id}
          orderId={orderItemData.id}
          products={orderItemData.products}
          date={new Date(+orderItemData.purchaseDateAndTime)}
          price={orderItemData.finalPriceIncludingTax}
        ></OrderItem>
      ))}
    </div>
  );
};

export default Orders;
