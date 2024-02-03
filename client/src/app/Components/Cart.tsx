import BookIcon from "./Icons/BookIcon";
import CreditCardIcon from "./Icons/CreditCardIcon";
import Logo from "./Logo";

const Cart = () => {
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
      <div className="border border-zinc-800  h-56 flex items-center justify-center rounded-lg">
        <p className="text-zinc-700 text-[0.8rem]">Your Cart is Empty!</p>
      </div>
    </>
  );
};

export default Cart;
