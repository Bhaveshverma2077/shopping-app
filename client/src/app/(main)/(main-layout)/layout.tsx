import Cart from "@/app/Components/Cart";
import CartAndOrdersLayout from "@/app/Components/CartAndOrdersLayout";
import Logo from "@/app/Components/Logo";
import Nav from "@/app/Components/Nav";

export default function Layout({
  children,
  orders,
}: {
  children: React.ReactNode;
  orders: React.ReactNode;
}) {
  return (
    <div className="w-full px-12 py-6 flex gap-6">
      <div className="flex w-[73%]">
        <div className="flex flex-col gap-6 w-full">
          <div className="flex gap-2 justify-between">
            <Logo></Logo>
            <Nav></Nav>
          </div>
          {children}
        </div>
      </div>
      <div className="w-[27%] border border-zinc-900 p-4 rounded-lg">
        <CartAndOrdersLayout></CartAndOrdersLayout>
      </div>
    </div>
  );
}
