import Image from "next/image";
import Logo from "./Components/Logo";
import TrendingIcon from "./Components/Icons/TrendingIcon";
import ChevronDownIcon from "./Components/Icons/ChevronDownIcon";
import SunIcon from "./Components/Icons/SunIcon";
import Nav from "./Components/Nav";
import BookIcon from "./Components/Icons/BookIcon";
import CreditCardIcon from "./Components/Icons/CreditCardIcon";
import Cart from "./Components/Cart";
import ChevronRightIcon from "./Components/Icons/ChevronRightIcon";
import TopOffersTile from "./Components/TopOffersTile";
import ChevronLeftIcon from "./Components/Icons/ChevronLeftIcon";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query ExampleQuery {
    products {
      id
      price
      description
      imageUrl
      name
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(query);
  console.log(data);

  return (
    <div className="flex w-2/3">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-2 justify-between">
          <Logo></Logo>
          <Nav></Nav>
        </div>
        <div className="flex flex-col justify-end gap-1 p-2 transition-all bg-cover hover:bg-[100%] bg-[url(http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fkud2gmc6%2Fproduction%2F8facabde3982fd3d4839f4695235c3747e771088-5966x3977.jpg&w=1200&q=75)] w-full h-64">
          <p className="text-2xl">Fashion For Everyone</p>
          <p className="text-sm">Get every fashion product at Rs. 899</p>
          <div className="flex gap-2">
            <button className="rounded-lg flex gap-2 items-center justify-center border border-zinc-800 bg-zinc-900 py-1 px-4">
              <p>Know more</p>
              <ChevronRightIcon></ChevronRightIcon>
            </button>
            <button className="rounded-lg border border-zinc-800 bg-zinc-900 py-1 px-2">
              <ChevronLeftIcon></ChevronLeftIcon>
            </button>
            <button className="rounded-lg border border-zinc-800 bg-zinc-900 py-1 px-2">
              <ChevronRightIcon></ChevronRightIcon>
            </button>
          </div>
        </div>
        <div className="flex gap-1 items-center justify-center">
          <div className="rounded-full w-2 h-2 border bg-white border-white"></div>
          <div className="rounded-full w-2 h-2 border border-white"></div>
        </div>
        {/*Second Sec*/}
        <div className="flex items-center justify-between">
          <p>Top Offers just for You</p>
          <div className="flex items-center">
            <p>View more</p>
            <ChevronRightIcon></ChevronRightIcon>
          </div>
        </div>
        <div className="flex gap-6 justify-between items-center">
          <TopOffersTile
            imageUrl="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fkud2gmc6%2Fproduction%2F3a85154f4f475cafe885f57586ee92f74c17a680-1200x800.webp&w=1920&q=75"
            text="Get All new Macbook at Rs. 5999pm"
          ></TopOffersTile>
          <TopOffersTile
            imageUrl="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fkud2gmc6%2Fproduction%2F3a85154f4f475cafe885f57586ee92f74c17a680-1200x800.webp&w=1920&q=75"
            text="Get All new Macbook at Rs. 5999pm"
          ></TopOffersTile>
          <TopOffersTile
            imageUrl="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fkud2gmc6%2Fproduction%2F3a85154f4f475cafe885f57586ee92f74c17a680-1200x800.webp&w=1920&q=75"
            text="Get All new Macbook at Rs. 5999pm"
          ></TopOffersTile>
        </div>
      </div>
    </div>
  );
}
