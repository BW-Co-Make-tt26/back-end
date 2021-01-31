const db = require("../../data/dbConfig");

module.exports = {
  get,
  getById,
  add,
  change,
  remove,
};

async function add(issue) {
  const newIssueId = await db("issues").insert(issue);
  return getById(newIssueId);
}
function get() {
  return db("issues");
}
function getById(id) {
  return db("issues").where("id", id).first();
}
function change(id, changes) {
  return db("issues")
    .where("id", id)
    .update(changes)
    .then(() => {
      return getById(id);
    });
}
function remove(id) {
    const deleted = getById(id);
    if (!deleted) {
        return Promise.resolve(null);
    } else {
        return db("issues").where("id", id).delete();
    }
}
