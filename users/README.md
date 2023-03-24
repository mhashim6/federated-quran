# Users
Auth. & Auth. with `bcrypt`, `jwt`, and `sequelize` on a PostgreSQL DB

## DB Model
``` js
  User: {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
  },
```

### Seed
You can seed the PostgreSql DB by running
``` shell
npm run seed
```
You can also customise the seed data in the `./db/seeder.js` file

## GrapghQL Schema
``` grapghql
type User {
  email: String!
  name: String!
}
```
### Signup
``` graphql
type SignUpResponse {
  token: String
  error: String
}

type Mutation {
  signUp(email: String, name: String, password: String): SignUpResponse
}
```

### Signin
``` graphql
type SignInResponse {
  token: String
  error: String
}

type Mutation {
  signIn(email: String, password: String): SignInResponse
}
```

### Change User's name
``` graphql
type ChangeNameResponse {
  email: String
  newName: String
  error: String
}

type Mutation {
  changeName(email: String, newName: String): ChangeNameResponse
}
```

## Testing
``` shell
npm run test
```
## Auth
`signUp` creates a new user and returns a `jwt` token. `signIn` returns the `jwt` token if the credentials are valid (using `bcrypt`).

`changeName` only is allowed for Admin users (where `isAdmin` is set to `true`) or if the current user wants to change their own name.
