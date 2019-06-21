import { QueryResolvers } from "../generated/graphqlgen";

export const Query: QueryResolvers.Type = {
  hello: () => "Hello world!"
};
