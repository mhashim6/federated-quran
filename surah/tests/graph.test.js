import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

import resolvers from "../resolvers.js";
import schema from "../schema.js";

test("returns surah Al-A'raaf", async () => {
  const testServer = new ApolloServer({
    schema: buildFederatedSchema({
      typeDefs: schema,
      resolvers: resolvers,
    }),
  });

  const res = await testServer.executeOperation({
    query: `
        query getSurahAlAraf($index: Int) {
            getSurah(index: $index) {
                name
                revelationType
            }
        }
  `,
    variables: { index: 7 },
  });

  expect(res.data.getSurah).toEqual({
    name: "Al-A'raaf",
    revelationType: "Meccan",
  });
});
