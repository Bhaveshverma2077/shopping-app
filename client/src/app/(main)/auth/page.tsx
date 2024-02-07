// "use client";
// import ProductTile from "@/app/Components/ProductTile";
// import { gql, useQuery } from "@apollo/client";

import EmailIcon from "@/app/Components/Icons/EmailIcon";
import LockIcon from "@/app/Components/Icons/LockIcon";
import Logo from "@/app/Components/Logo";

// const GET_FASHION_PRODUCTS = gql`
//   query GetProducts($typeName: String) {
//     products(type: $typeName) {
//       id
//       name
//       price
//       imageUrl
//       discountPercentage
//     }
//   }
// `;

export default function Page() {
  // const { data, loading, error } = useQuery<{
  //   products: [
  //     {
  //       id: string;
  //       name: string;
  //       imageUrl: string;
  //       price: number;
  //       discountPercentage: number;
  //     }
  //   ];
  // }>(GET_FASHION_PRODUCTS, { variables: { typeName: "fashion" } });

  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <div className="bg-zinc-900 flex flex-col gap-4 items-center justify-center rounded-lg p-8 shadow-lg shadow-gray-800">
        <Logo></Logo>
        <p className="text-[2rem]">Welcome back</p>
        <p className="text-[0.8rem] text-gray-400 pb-8">
          Don't have an account yet?
          <span className="text-white font-semibold"> Sign Up</span>
        </p>
        <div className="relative">
          <input
            className="p-1 pl-10 rounded-lg outline-none bg-black"
            type="text"
            placeholder="Email"
            name=""
            id=""
          />
          <div className="absolute top-1 left-1 scale-75">
            <EmailIcon></EmailIcon>
          </div>
        </div>
        <div className="relative">
          <input
            className="p-1 pl-10 rounded-lg outline-none bg-black"
            placeholder="Password"
            type="password"
            name=""
            id=""
          />
          <div className="absolute top-1 left-1 scale-75">
            <LockIcon></LockIcon>
          </div>
        </div>

        <button className="bg-gray-800 w-full py-2 rounded-lg" type="submit">
          Log In
        </button>
      </div>
    </div>
  );
}
