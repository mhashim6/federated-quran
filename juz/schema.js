import { gql } from "apollo-server";

export default gql`
  type Juz {
    surah: Int!
    ayah: Int!
  }

  type Query {
    juzs: [Juz!]!
    getJuz(index: Int): Juz
  }
`;
