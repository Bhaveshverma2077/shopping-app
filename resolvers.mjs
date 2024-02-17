import {
  CarouselItem,
  Order,
  Product,
  TopOffer,
  User,
} from "./model/index.mjs";

const resolvers = {
  Query: {
    async products(parent, args, contextValue, info) {
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
    async productsByString(parent, args, contextValue, info) {
      const searchString = args.searchString;
      return await Product.find({
        name: { $regex: searchString, $options: "i" },
      });
    },
    async topOffers(parent, args, contextValue, info) {
      return TopOffer.find({});
    },
    async user(parent, args, contextValue, info) {
      const user = contextValue.user;
      return user;
    },
    async product(parent, args, contextValue, info) {
      try {
        return await Product.findOne({ _id: args.id });
      } catch (err) {
        if (err.message.startsWith("Cast to ObjectId failed")) {
          return undefined;
        }
      }
    },
    async carouselItems(parent, args, contextValue, info) {
      const carouselItems = await CarouselItem.find({});
      return carouselItems;
    },
  },
  Mutation: {
    async incOrDecCartItem(parent, args, contextValue, info) {
      const user = contextValue.user;
      if (!user) {
        return {
          success: false,
          code: "UNAUTHENTICATED",
          message: "login is required to perform this action!",
        };
      }
      const cart = contextValue.user.cart;
      const productId = args.productId;
      const inc = args.inc;
      const cartItem = cart.find((item) => item.productId === productId);
      const cartItemQuatity = cartItem?.quantity;
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
        return {
          success: true,
          code: "SUCCESS",
          message: "operation successful",
          data: (await User.findOne({ email: user.email })).cart.find(
            (item) => item.productId === productId
          ),
        };
      }
      // push with quantity=1
      if (inc) {
        let product;
        try {
          product = await Product.findOne({ _id: productId });
        } catch (err) {
          if (err.message.startsWith("Cast to ObjectId failed")) {
            return {
              success: false,
              code: "INVALID_INPUT",
              message: `No product exists with the specified ID ${productId}`,
            };
          }
        }
        await User.updateOne(
          { email: user.email },
          {
            $push: {
              cart: {
                productId,
                pricePerUnit: product.price,
                discountPerUnit:
                  (product.discountPercentage * product.price) / 100,
                quantity: 1,
              },
            },
          }
        );
      }
      return {
        success: true,
        code: "SUCCESS",
        message: "operation successful",
        data: (await User.findOne({ email: user.email })).cart.find(
          (item) => item.productId === productId
        ),
      };
    },
    async placeOrder(parent, args, contextValue, info) {
      const taxPercent = 5;
      const user = contextValue.user;
      if (!user) {
        return {
          success: false,
          code: "UNAUTHENTICATED",
          message: "login is required to perform this action!",
        };
      }
      const priceIncludingDiscount = user.cart.reduce(
        (acc, value) =>
          acc + (value.pricePerUnit - value.discountPerUnit) * value.quantity,
        0
      );
      const finalPriceIncludingTax =
        priceIncludingDiscount + (priceIncludingDiscount * taxPercent) / 100;
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
      return {
        success: true,
        code: "SUCCESS",
        message: "Operation Successful",
        order:
          userWithUpdatedOrder.orders[userWithUpdatedOrder.orders.length - 1],
      };
    },
    async removeCartItem(parent, args, contextValue, info) {
      const user = contextValue.user;
      if (!user) {
        return {
          success: false,
          code: "UNAUTHENTICATED",
          message: "login is required to perform this action!",
        };
      }
      const productId = args.productId;
      await User.updateOne(
        { email: user.email },
        { $pull: { cart: { productId } } }
      );
      return {
        success: true,
        code: "SUCCESS",
        message: "operation successful",
      };
    },
  },
};

export default resolvers;
