import express from "express";
import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-express";
import { importSchema } from "graphql-import";
import { applyMiddleware } from "graphql-middleware";
import { resolvers } from "./resolvers";

const typeDefs = gql(importSchema("src/graphql/schema.graphql"));

const logMiddleware = async (resolve: any) => {
  try {
    const res = await resolve();
    console.log(`Result: ${res}`);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const permissions = {
  Query: {
    hello: logMiddleware
  }
};

const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers: resolvers as any }),
  permissions
);

const server = new ApolloServer({
  schema,
  context: req => ({ ...req })
});

const app = express();
server.applyMiddleware({ app });

const port = process.env.PORT || 4000;
app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);
