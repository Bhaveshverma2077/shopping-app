import gql from "graphql-tag";

const GET_USER = gql`
  query GETUSER {
    user {
      userName
      cart {
        productId
        quantity
        discountPerUnit
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

const ADD_OR_REMOVE_CART_ITEM = gql`
  mutation IncOrDecCartItem($productId: String!, $inc: Boolean!) {
    incOrDecCartItem(productId: $productId, inc: $inc) {
      code
    }
  }
`;

export { GET_USER, ADD_OR_REMOVE_CART_ITEM };
