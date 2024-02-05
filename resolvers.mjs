import { CarouselItem, Product } from "./model/index.mjs";

const resolvers = {
  Query: {
    async products(parent, args, contextValue, info) {
      const products = await Product.find({});
      return products;
    },
    async carouselItems(parent, args, contextValue, info) {
      const carouselItems = await CarouselItem.find({});
      return carouselItems;
    },
  },
};

export default resolvers;
