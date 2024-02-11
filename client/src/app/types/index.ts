type Product = {
  id: string;
  companyName: string;
  description: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  discountPercentage: number;
};

type CartItemType = {
  productId: string;
  quantity: number;
  pricePerUnit: number;
};

type OrderItemType = {
  id: string;
  products: Array<CartItemType>;
  finalPriceIncludingTax: number;
};

export type { Product, CartItemType, OrderItemType };
