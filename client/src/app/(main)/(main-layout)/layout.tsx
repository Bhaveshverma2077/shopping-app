import Cart from "@/app/Components/Cart";
import Logo from "@/app/Components/Logo";
import Nav from "@/app/Components/Nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full px-12 py-6 flex gap-6">
      <div className="flex w-9/12">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex gap-2 justify-between">
            <Logo></Logo>
            <Nav></Nav>
          </div>
          {children}
        </div>
      </div>
      <div className="w-1/4 border border-zinc-900 p-4 rounded-lg">
        <Cart></Cart>
      </div>
    </div>
  );
}
