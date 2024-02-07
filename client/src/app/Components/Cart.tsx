import CartItem from "./CartItem";
import BookIcon from "./Icons/BookIcon";
import CreditCardIcon from "./Icons/CreditCardIcon";
import DeleteIcon from "./Icons/DeleteIcon";
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
      <CartItem></CartItem>
      <CartItem></CartItem>
    </>
  );
};

export default Cart;
