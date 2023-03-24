import { encrypt, isValidPassword, token } from "./auth.js";
import { allUsers, createUser, findUser, updateUser } from "./db/repo.js";

export default {
  Query: {
    users: async (parent) => await allUsers(),
  },

  Mutation: {
    signUp: async (parent, args, context, info) => {
      const { email, name, password } = args;

      if (await findUser({ email })) return { error: "User already exists." };

      const passwordHash = await encrypt(password);
      const user = await createUser({ email, name, password: passwordHash });

      const jwt = token(user);
      return { token: jwt };
    },

    signIn: async (parent, args, context, info) => {
      const { email, password } = args;

      const user = await findUser({ email });
      if (!user) return { error: "User not found." };

      const isValid = await isValidPassword(password, user.password);
      if (!isValid) return { error: "Password does not match." };

      const jwt = token(user);
      return { token: jwt };
    },

    changeName: async (parent, args, { userEmail }) => {
      const { email, newName } = args;

      const user = await findUser({ email: userEmail });
      if (!user.isAdmin && userEmail != email)
        return { error: "You don't have permissions to change this name" };

      const targetUser = await findUser({ email });
      if (!targetUser) return { error: "No such user." };

      await updateUser(targetUser, { name: newName });

      return { email: email, newName };
    },
  },
};
