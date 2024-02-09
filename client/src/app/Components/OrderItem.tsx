// const GET_PRODUCT = gql`
//   query ($productId: String!) {
//     product(id: $productId) {
//       id
//       companyName
//       description
//       name
//       price
//       rating
//       imageUrl
//       discountPercentage
//     }
//   }
// `;

const OrderItem = () => {
  //   const {
  //     data: productData,
  //     loading,
  //     error,
  //   } = useQuery<{
  //     product: {
  //       id: string;
  //       companyName: string;
  //       description: string;
  //       name: string;
  //       price: number;
  //       rating: number;
  //       imageUrl: string;
  //       discountPercentage: number;
  //     };
  //   }>(GET_PRODUCT, { variables: { productId } });

  return (
    <div className="border border-zinc-800 flex gap-4 flex-col items-center justify-start px-3 rounded-lg">
      <div className="flex justify-between p-1 w-full">
        <p>ID:</p>
        <p>7fnw4tf64t5dn</p>
      </div>

      <hr className="border-purple-600" />
      <div className="flex justify-between p-1 w-full">
        <p>ID:</p>
        <p>7fnw4tf64t5dn</p>
      </div>
      <div className="flex justify-between p-1 w-full">
        <p>ID:</p>
        <p>7fnw4tf64t5dn</p>
      </div>
    </div>
  );
};

export default OrderItem;

{
  /* <div className="border border-zinc-800  h-28 flex gap-4 items-center justify-start px-3 rounded-lg">
<p className="text-zinc-700 text-[0.8rem]">Your Cart is Empty!</p> */
}

{
  /* <div className="flex flex-end w-full">
  <p>${"productData?.product.price"}</p>
</div> */
}
// </div>
