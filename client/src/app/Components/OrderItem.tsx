import { CartItemType } from "../types";

const dateToLocaleString = (date: Date) =>
  date.toLocaleString("default", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour12: true,
    hour: "2-digit",
    second: "2-digit",
    minute: "2-digit",
  });

const OrderItem = ({
  orderId,
  date,
  price,
  products,
}: {
  orderId: string;
  date: Date;
  price: number;
  products: Array<CartItemType>;
}) => {
  let dateString = dateToLocaleString(date);
  return (
    <div className="border border-zinc-800 flex  flex-col items-center justify-start p-3 rounded-lg">
      <div className="mb-4 flex flex-col justify-between p-1 w-full">
        <p className="text-[1.5rem]">ORDER ID:</p>
        <p>{orderId}</p>
      </div>
      {products.map((product) => (
        <div className="flex justify-between p-1 w-full">
          <p className="text-zinc-600 text-[0.7rem]">{product.productId}</p>
          <p className="text-zinc-600 text-[0.7rem]">x{product.quantity}</p>
        </div>
      ))}
      <div className="pt-4 flex justify-end p-1 w-full">
        <p className="text-[0.8rem]">{dateString}</p>
      </div>
      <div className="text-[2.2rem] flex justify-end p-1 w-full">
        <p>$ {price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderItem;
