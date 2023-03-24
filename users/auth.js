import { compare, hash } from "bcrypt";
import JWT from "jsonwebtoken";

const { SALT_ROUNDS = 12 } = process.env;
const isValidPassword = async (password, hash) => compare(password, hash);

const encrypt = async (password) => {
  return hash(password, parseInt(SALT_ROUNDS));
};

const { TOKEN_SECRET = "StellaStays" } = process.env;
const token = (user) => JWT.sign({ email: user.email }, TOKEN_SECRET);
const verifyToken = (token) => {
  return JWT.verify(token, TOKEN_SECRET).email;
};

export { isValidPassword, encrypt, token, verifyToken };
