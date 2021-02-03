exports.up = function (knex) {
  return knex.schema.table("issues", (tbl) => {
    // add upvotes column to issues table
    tbl.integer("upvotes").unsigned().defaultTo(0);
  });
};

exports.down = function (knex) {
  knex.schema.table("issues", (tbl) => {
    tbl.dropColumn("upvotes");
  });
};
