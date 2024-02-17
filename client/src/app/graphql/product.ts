import gql from "graphql-tag";

const GET_PRODUCTS = gql`
  query GetProducts($typeName: String) {
    products(type: $typeName) {
      id
      name
      price
      imageUrls
      discountPercentage
    }
  }
`;

const GET_PRODUCT = gql`
  query GetProduct($productId: String!) {
    product(id: $productId) {
      companyName
      description
      variants
      name
      price
      rating
      imageUrls
      discountPercentage
    }
  }
`;

export { GET_PRODUCTS, GET_PRODUCT };
