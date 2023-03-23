import { gql } from "apollo-server";

export default gql`
  type Surah @key(fields: "index") {
    name: String!
    index: Int!
    numberOfAyahs: Int!
    revelationType: String!
  }

  type Query {
    surahs: [Surah!]!
    getSurah(index: Int): Surah
  }
`;
