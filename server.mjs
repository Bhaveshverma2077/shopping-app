import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";

import { readFileSync } from "fs";

import resolvers from "./resolvers.mjs";
import { User } from "./model/index.mjs";

import authController from "./controllers/authController.mjs";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(
  cors({
    origin: ["localhost:3000"],
    allowedHeaders: ["Authorization"],
    credentials: true,
  })
);
app.use(express.json());

const typeDefs = new gql(
  readFileSync("schema.graphql", {
    encoding: "utf-8",
  })
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

await mongoose.connect("mongodb://127.0.0.1:27017/shopping-db");
await server.start();

app.post("/auth", authController);

app.use(
  "/graphql",
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const token = req.headers.authorization || "";
      let user;
      console.log(token);
      if (token !== "") {
        try {
          const jsonData = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          console.log(error);
        }
        return {};
        console.log(jsonData);
        const { email } = JSON.parse(jsonData);
        console.log(email);
        user = await User.find({ email });
        console.log(user);
      }
      console.log(user);
      return { user };
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
