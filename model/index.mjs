import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
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

const Product = mongoose.model("Product", productSchema);

const CarouselItem = mongoose.model("CarouselItem", carouselItemSchema);

export { Product, CarouselItem };
