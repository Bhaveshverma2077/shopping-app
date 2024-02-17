import Image from "next/image";
import Link from "next/link";

const TopOffersTile = (props: {
  imageUrl: string;
  text: string;
  link: string;
}) => {
  return (
    <Link
      href={props.link}
      className="snap-center relative w-1/3  h-64 flex-shrink-0"
    >
      <div className="overflow-hidden h-full w-full rounded-lg">
        <Image
          className="object-cover"
          src={props.imageUrl}
          fill={true}
          alt=""
        ></Image>
      </div>
      <div className="border rounded-lg bg-black border-zinc-800 p-2 absolute bottom-6 -left-2">
        <p>{props.text}</p>
      </div>
    </Link>
  );
};

export default TopOffersTile;
