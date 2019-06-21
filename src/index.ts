import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";

const typeDefs = gql(importSchema("src/graphql/schema.graphql"));

const server = new ApolloServer({ typeDefs, resolvers: resolvers as any });

const app = express();
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;
app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
