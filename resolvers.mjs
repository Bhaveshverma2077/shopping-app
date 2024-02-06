import { CarouselItem, Product } from "./model/index.mjs";
import fs from "fs";
import path from "path";

const resolvers = {
  Query: {
    async products(parent, args, contextValue, info) {
      // const x = Product.insertMany(
      //   JSON.parse(fs.readFileSync(path.join(process.cwd(), "products.json")))
      // );
      let products;
      if (args.type === "electronic") {
        products = await Product.find({ type: "electronic" });
      } else if (args.type === "fashion") {
        products = await Product.find({ type: "fashion" });
      } else {
        products = await Product.find({});
      }
      return products;
    },
    async product(parent, args, contextValue, info) {
      // const x = Product.insertMany(
      //   JSON.parse(fs.readFileSync(path.join(process.cwd(), "products.json")))
      // );
      const products = await Product.find({ _id: args.id });
      return products[0];
    },
    async carouselItems(parent, args, contextValue, info) {
      const carouselItems = await CarouselItem.find({});
      return carouselItems;
    },
  },
};

export default resolvers;
