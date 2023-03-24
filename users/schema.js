import { gql } from "apollo-server";

export default gql`
  type User @key(fields: "email") {
    email: String!
    name: String!
  }

  type Query {
    users: [User!]!
  }

  type SignInResponse {
    token: String
    error: String
  }

  type SignUpResponse {
    token: String
    error: String
  }

  type ChangeNameResponse {
    email: String
    newName: String
    error: String
  }

  type Mutation {
    signUp(email: String, name: String, password: String): SignUpResponse
    signIn(email: String, password: String): SignInResponse
    changeName(email: String, newName: String): ChangeNameResponse
  }
`;
