import { ApolloServer } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

import resolvers from "../resolvers.js";
import schema from "../schema.js";

test("returns juz 4", async () => {
  const testServer = new ApolloServer({
    schema: buildFederatedSchema({
      typeDefs: schema,
      resolvers: resolvers,
    }),
  });

  const res = await testServer.executeOperation({
    query: `
        query getjuz4($index: Int) {
            getJuz(index: $index) {
                surahIndex
                ayah
            }
        }
  `,
    variables: { index: 4 },
  });

  expect(res.data.getJuz).toEqual({
    surahIndex: 3,
    ayah: 93,
  });
});
