import HamburgerIcon from "./Icons/HamburgerIcon";

const HamburgerButton = () => {
  return (
    <button
      onClick={() => {}}
      className="flex hover:bg-zinc-700 p-[3px] rounded-lg items-center justify-between"
    >
      <div className="flex items-center justify-center">
        <div className="scale-[0.6]">{<HamburgerIcon></HamburgerIcon>}</div>
      </div>
    </button>
  );
};

export default HamburgerButton;
