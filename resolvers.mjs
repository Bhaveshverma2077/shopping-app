import { readFileSync } from "fs";
import path from "path";

const resolvers = {
  Query: {
    products(parent, args, contextValue, info) {
      const products = JSON.parse(
        readFileSync(path.join(process.cwd(), "products.json"))
      );
      return products;
    },
  },
};

export default resolvers;
