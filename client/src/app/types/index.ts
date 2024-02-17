type Product = {
  id: string;
  companyName: string;
  description: string;
  name: string;
  variants: Array<string>;
  price: number;
  rating: number;
  imageUrls: Array<string>;
  discountPercentage: number;
};

type User = {
  userName: string;
  email: string;
  cart: Array<CartItemType>;
  orders: Array<OrderItemType>;
};

type CartItemType = {
  productId: string;
  quantity: number;
  pricePerUnit: number;
  discountPerUnit: number;
};

type OrderItemType = {
  id: string;
  products: Array<CartItemType>;
  finalPriceIncludingTax: number;
};

export type { Product, CartItemType, OrderItemType, User };
