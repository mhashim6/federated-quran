import { encrypt } from "../auth.js";
import { createUser, initDB } from "./repo.js";

await initDB(true);
createUser({
  email: "msg@mhashim6.me",
  password: await encrypt("123456"),
  name: "Muhammad Hashim",
  isAdmin: true,
});
