import ChevronRightIcon from "@/app/Components/Icons/ChevronRightIcon";
import TopOffersTile from "@/app/Components/TopOffersTile";

export default function Page() {
  return (
    <>
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
    </>
  );
}
