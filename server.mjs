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
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ["GET", "POST", "OPTIONS"],
    // credentials: true,
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
      if (token !== "") {
        let tokenObject = {};
        try {
          tokenObject = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        } catch (error) {}
        const { email } = tokenObject;
        user = await User.findOne({ email });
      }
      return { user };
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
