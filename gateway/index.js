import { ApolloServer } from "apollo-server";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";

import { extractToken } from "./utils.js";

const {
  PORT = 80,
  JUZ_URL = "http://localhost:5001",
  SURAH_URL = "http://localhost:5002",
  USERS_URL = "http://localhost:5003",
} = process.env;

const gateway = new ApolloGateway({
  // producing the graph dynamically is good for bootstrapping,
  // but it's better to statically produce and compose the subgraphs
  // in production
  serviceList: [
    { name: "juz", url: JUZ_URL },
    { name: "surah", url: SURAH_URL },
    { name: "users", url: USERS_URL },
  ],
  buildService: ({ name, url }) => {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest({ request, context }) {
        request.http.headers.set("token", context.token);
      },
    });
  },
});

const server = new ApolloServer({
  gateway,
  context: async ({ req }) => {
    const token = extractToken(req);
    return { token };
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Gateway Server ready at ${url}`);
});
