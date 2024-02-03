import express from "express";
import cors from "cors";
import gql from "graphql-tag";
import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { expressMiddleware } from "@apollo/server/express4";

import { readFileSync } from "fs";

import resolvers from "./resolvers.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

const typeDefs = new gql(
  readFileSync("schema.graphql", {
    encoding: "utf-8",
  })
);

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

await server.start();

app.use(
  "/graphql",
  expressMiddleware(server, { context: async ({ req, res }) => ({}) })
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
