import { QueryResolvers } from "../generated/graphql-resolver-types";

export const Query: QueryResolvers = {
  hello: () => "Hello world!"
};
