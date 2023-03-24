import { Sequelize } from "sequelize";
import { Models } from "./models.js";

const { DB_CONNECTION = "postgres://postgres:password@localhost:5432/users" } =
  process.env;

const sequelize = new Sequelize(DB_CONNECTION);
const User = sequelize.define("User", Models.User);

const initDB = async (force = false) => {
  try {
    await sequelize.authenticate();
    console.log("DB Connection has been established successfully.");
    await sequelize.sync({ force });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return;
  }
};

const createUser = async ({ email, name, password, isAdmin = false }) => {
  return await User.create({ email, name, password, isAdmin });
};

const createUsers = async (users) => {
  return await User.bulkCreate(
    users.map((it) => ({ ...it, isAdmin: it.isAdmin || false }))
  );
};

const findUser = async ({ email }) => User.findOne({ where: { email: email } });
const allUsers = async () => await User.findAll();
const updateUser = async ({ email }, updates) =>
  User.update(updates, { where: { email: email } });

export {
  initDB,
  sequelize as db,
  createUser,
  createUsers,
  allUsers,
  findUser,
  updateUser,
};
