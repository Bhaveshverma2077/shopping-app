import BookIcon from "./Icons/BookIcon";
import CreditCardIcon from "./Icons/CreditCardIcon";
import DeleteIcon from "./Icons/DeleteIcon";
import Logo from "./Logo";

const CartItem = () => {
  return (
    <div className="border border-zinc-800  h-28 flex gap-4 items-center justify-center rounded-lg">
      {/* <p className="text-zinc-700 text-[0.8rem]">Your Cart is Empty!</p> */}
      <div className="border border-zinc-800 rounded-lg overflow-hidden">
        <img
          className="w-20 h-20 object-cover"
          src={
            "https://firebasestorage.googleapis.com/v0/b/shopping-app-9f7fc.appspot.com/o/macbook.jpg?alt=media"
          }
          alt=""
        />
      </div>
      <div>
        <p>Macbook Air 14'</p>
        <p className="text-gray-600 text-sm pb-2">Pink | 256 GB</p>
        <div className="flex gap-2">
          <a className="cursor-pointer scale-75">
            <DeleteIcon></DeleteIcon>
          </a>
          <div className="w-16 flex border border-zinc-800 rounded-sm overflow-hidden">
            <a className="cursor-pointer text-[0.9rem] bg-zinc-800 flex-1 flex justify-center items-center">
              <p>-</p>
            </a>
            <div className="text-[0.9rem] flex items-center flex-1 justify-center">
              <p>3</p>
            </div>
            <a className="cursor-pointer text-[0.9rem] bg-zinc-800 flex items-center flex-1 justify-center">
              <p>+</p>
            </a>
          </div>
        </div>
      </div>
      <div>$1199.00</div>
    </div>
  );
};

export default CartItem;
