import {
  CarouselItem,
  CartItem,
  Order,
  Product,
  User,
} from "./model/index.mjs";
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
    async user(parent, args, contextValue, info) {
      // User.insertMany([
      //   {
      //     userName: "yeah sure",
      //     email: "yeah3977@gmail.com",
      //     password: "00000000",
      //     imageUrl: "",
      //     cart: [],
      //   },
      // ]);
      console.log(contextValue);
      const user = contextValue.user;
      return user;
    },
    async product(parent, args, contextValue, info) {
      // const x = Product.insertMany(
      //   JSON.parse(fs.readFileSync(path.join(process.cwd(), "products.json")))
      // );
      const product = await Product.findOne({ _id: args.id });
      return product;
    },
    async productsByIds(parent, args, contextValue, info) {
      const productIds = args.productIds;
      const products = await Promise.all(
        productIds.map((id) => Product.findOne({ _id: id }))
      );
      return products;
    },

    async carouselItems(parent, args, contextValue, info) {
      const carouselItems = await CarouselItem.find({});
      return carouselItems;
    },
  },
  Mutation: {
    async incOrDecCartItem(parent, args, contextValue, info) {
      const user = contextValue.user;
      const cart = contextValue.user.cart;
      const productId = args.productId;
      const inc = args.inc;
      console.log(inc);
      const cartItem = cart.find((item) => item.productId === productId);
      const cartItemQuatity = cartItem?.quantity;
      console.log(cartItemQuatity);
      if (cartItem) {
        // inc quantity
        if (cartItemQuatity === 1 && !inc) {
          //remove
          await User.updateOne(
            { email: user.email },
            { $pull: { cart: { productId } } }
          );
        } else {
          await User.findOneAndUpdate(
            { email: user.email, "cart.productId": productId },
            { $inc: { "cart.$.quantity": inc ? 1 : -1 } }
          );
        }
        return (await User.findOne({ email: user.email })).cart.find(
          (item) => item.productId === productId
        );
      }
      // push with quantity=1
      if (inc) {
        await User.updateOne(
          { email: user.email },
          {
            $push: {
              cart: {
                productId,
                pricePerUnit: (await Product.findOne({ _id: productId })).price,
                quantity: 1,
              },
            },
          }
        );
      }
      return (await User.findOne({ email: user.email })).cart.find(
        (item) => item.productId === productId
      );
    },
    async placeOrder(parent, args, contextValue, info) {
      const user = contextValue.user;
      const subTotal = user.cart.reduce(
        (acc, value) => acc + value.pricePerUnit * value.quantity,
        0
      );
      const finalPriceIncludingTax = subTotal + subTotal / 20;
      const orderData = { products: user.cart, finalPriceIncludingTax };
      const order = new Order(orderData);
      await User.findOneAndUpdate(
        { email: user.email },
        { $push: { orders: order } }
      );

      await User.findOneAndUpdate(
        { email: user.email },
        { $set: { cart: [] } }
      );

      const userWithUpdatedOrder = await User.findOne({ email: user.email });
      return userWithUpdatedOrder.orders[
        userWithUpdatedOrder.orders.length - 1
      ];
    },
    async deleteCartItem(parent, args, contextValue, info) {
      const products = await Product.find({ _id: args.id });
      return products[0];
    },
  },
};

export default resolvers;
