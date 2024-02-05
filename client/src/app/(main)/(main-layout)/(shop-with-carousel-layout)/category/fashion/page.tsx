import ProductTile from "@/app/Components/ProductTile";

export default function Page() {
  return (
    <>
      <div className="border border-zinc-800 w-full flex items-center justify-center py-6 rounded-lg text-3xl text-zinc-600 font-bold">
        FASHION
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-7 justify-evenly">
        {Array.from({ length: 12 }, () => (
          <ProductTile
            name="Galaxy S23 Ultra 512Gb"
            mrp={124999}
            discount={12}
            imgUrl="http://localhost:3000/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fkud2gmc6%2Fproduction%2Fb0cf088c75287a4030e8630acd1aa690e6059a8a-1200x675.jpg&w=1920&q=75"
          ></ProductTile>
        ))}
      </div>
    </>
  );
}
