import gql from "graphql-tag";

const GET_USER = gql`
  query GETUSER {
    user {
      userName
      cart {
        productId
        quantity
        pricePerUnit
      }
      orders {
        id
        products {
          productId
          pricePerUnit
          quantity
        }
        finalPriceIncludingTax
      }
    }
  }
`;

export { GET_USER };
