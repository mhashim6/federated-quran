import { ApolloServer } from "apollo-server";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const {
  PORT = 80,
  JUZ_URL = "http://localhost:5001",
  SURAH_URL = "http://localhost:5002",
} = process.env;

const gateway = new ApolloGateway({
  // producing the graph dynamically is good for bootstrapping,
  // but it's better to statically produce and compose the subgraphs
  // in production
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "juz", url: JUZ_URL },
      { name: "surah", url: SURAH_URL },
    ],
  }),
});

const server = new ApolloServer({
  gateway,
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Gateway Server ready at ${url}`);
});
