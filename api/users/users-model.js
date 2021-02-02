const db = require("../../data/dbConfig");

module.exports = {
  get,
  getBy,
  getById,
  add,
  getUser,
};

function get() {
  return db("users");
}
function getBy(filter) {
  return db("users").where(filter);
}
function getUser(filter) {
  return db("users")
    .where(filter)
    .select("user_id", "first_name", "last_name", "username", "email");
}
function getById(id) {
  return db("users").where("user_id", id).first();
}
async function add(user) {
  // const newUser = user.username
  // console.log(newUser);
  // await db("users").insert(user)
  // const returned = await db("users").where("username", newUser).first();
  // return returned;
  const newUser = await db("users").insert(user).returning("*");
  return newUser[0];
}
