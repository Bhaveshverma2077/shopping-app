import Link from "next/link";
import ShoppingCartIcon from "./Icons/ShoppingCartIcon";
import { generateImageUrl } from "../utils";

const ProductTile = (props: {
  id: string;
  name: string;
  imgUrl: string;
  mrp: number;
  discount: number;
}) => {
  return (
    <div className="w-56">
      <div className="h-64 w-full overflow-hidden rounded-lg mb-2">
        <img
          className="h-full w-full object-cover"
          src={generateImageUrl(props.imgUrl)}
          alt=""
        />
      </div>
      <div className="flex gap-1 justify-between">
        <div className="border border-zinc-800 rounded-lg text-[0.7rem] px-3 py-2 w-full">
          <div>
            {props.name.length > 20
              ? `${props.name.substring(0, 20)}...`
              : props.name}
          </div>
          <div className="flex items-start gap-1">
            <span className="text-[0.6rem] line-through text-zinc-500">
              $ {props.mrp.toFixed(2)}
            </span>
            $ {(props.mrp - (props.discount * props.mrp) / 100).toFixed(2)}
            <div className="bg-yellow-600 px-1 py-0.5 rounded-md text-[0.6rem]">
              {props.discount}%
            </div>
          </div>
        </div>
        <Link
          href={`/products/${props.id}`}
          className="flex items-center justify-center bg-gray-900 hover:bg-gray-800 px-4 rounded-lg"
        >
          <div className="scale-75">
            <ShoppingCartIcon></ShoppingCartIcon>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductTile;
