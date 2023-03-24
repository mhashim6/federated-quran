import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

import { initDB } from "./db/repo.js";
import { verifyToken } from "./auth.js";

const { PORT = 5003 } = process.env;

await initDB(false);

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ req }) => {
    // a bad hack ¯\_(ツ)_/¯
    if (!req.headers.token || req.headers.token == "undefined")
      return { email: null };
    return { userEmail: verifyToken(req.headers.token) };
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Users Server ready at ${url}`);
});
