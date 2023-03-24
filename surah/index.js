import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

const { PORT = 5002 } = process.env;

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Surah Server ready at ${url}`);
});
