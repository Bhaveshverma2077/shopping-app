import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: String,
  companyName: String,
  imageUrl: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
});

const carouselItemSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  imageUrl: String,
  link: String,
});

const cartItemSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  pricePerUnit: Number,
});

const orderItemSchema = new mongoose.Schema({
  products: [cartItemSchema],
  finalPriceIncludingTax: Number,
});

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  imageUrl: String,
  password: String,
  cart: [cartItemSchema],
  orders: [orderItemSchema],
});

const Product = mongoose.model("Product", productSchema);

const CarouselItem = mongoose.model("CarouselItem", carouselItemSchema);

const CartItem = mongoose.model("CartItem", cartItemSchema);

const User = mongoose.model("User", userSchema);

const Order = mongoose.model("Order", orderItemSchema);

export { Product, CarouselItem, CartItem, User, Order };
