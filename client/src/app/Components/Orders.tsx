import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/user";
import OrderItem from "./OrderItem";
import { CartItemType, OrderItemType } from "../types";

const Orders = () => {
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch,
  } = useQuery<{
    user: {
      cart: Array<CartItemType>;
      orders: Array<OrderItemType>;
    };
  }>(GET_USER);

  if (!userData?.user) {
    // if not logged in
    return (
      <div className="border border-zinc-800  h-28 flex gap-4 items-center justify-center px-3 rounded-lg">
        <p className="text-zinc-600">No Orders!</p>
      </div>
    );
  }

  const orders = userData.user.orders;

  return (
    <div className="max-h-[50rem] customized-scrollbar overflow-hidden overflow-y-auto">
      {orders.map((orderItemData) => (
        <OrderItem
          orderId={orderItemData.id}
          products={orderItemData.products}
          date={new Date()}
          price={orderItemData.finalPriceIncludingTax}
        ></OrderItem>
      ))}
    </div>
  );
};

export default Orders;
