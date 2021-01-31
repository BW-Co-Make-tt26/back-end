const db = require("../../data/dbConfig");

module.exports = {
  get,
  getBy,
  getById,
  add,
};

function get() {
  return db("users");
}
function getBy(filter) {
  return db("users").where(filter);
}
function getById(id) {
  return db("users").where("user_id", id).first();
}
async function add(user) {
  const newUserId = await db("users").insert(user);
  return getById(newUserId);
}
