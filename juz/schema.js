import { gql } from "apollo-server";

export default gql`
  extend type Surah @key(fields: "index") {
    index: Int!
  }

  type Juz @key(fields: "number") {
    number: Int!
    surahIndex: Int!
    surah: Surah!
    ayah: Int!
  }

  type Query {
    juzs: [Juz!]!
    getJuz(index: Int): Juz
  }
`;
