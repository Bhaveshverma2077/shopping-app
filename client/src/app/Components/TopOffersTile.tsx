const TopOffersTile = (porps: { imageUrl: string; text: string }) => {
  return (
    <div className="snap-center relative w-1/3  h-64 flex-shrink-0">
      <div className="overflow-hidden h-full w-full rounded-lg">
        <img
          className="object-cover h-full w-full"
          src={porps.imageUrl}
          alt=""
        />
      </div>
      <div className="border rounded-lg bg-black border-zinc-800 p-2 absolute bottom-6 -left-4">
        <p>{porps.text}</p>
      </div>
    </div>
  );
};

export default TopOffersTile;
