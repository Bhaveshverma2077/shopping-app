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
      className="snap-center relative w-1/3 min-w-64  h-64 flex-shrink-0"
    >
      <div className="relative overflow-hidden h-full w-full rounded-lg">
        <Image
          className="object-cover"
          src={props.imageUrl}
          fill={true}
          sizes="(max-width: 600px) 80vw,(max-width: 600px)"
          alt="offer image"
        ></Image>
      </div>
      <div className="border rounded-lg bg-black border-zinc-800 p-2 absolute bottom-6 left-0">
        <p>{props.text}</p>
      </div>
    </Link>
  );
};

export default TopOffersTile;
