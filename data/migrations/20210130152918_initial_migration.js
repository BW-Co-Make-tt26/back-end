exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("user_id");
      tbl.string("first_name", 128).notNullable();
      tbl.string("last_name", 128).notNullable();
      tbl.string("email", 128).notNullable().unique();
      tbl.string("username", 128).notNullable().unique();
      tbl.string("password", 256).notNullable();
    })
    .createTable("issues", (tbl) => {
      tbl.increments();
      tbl.string("issue", 256).notNullable();
      tbl.string("description", 1000).notNullable();
      tbl.string("image", 355);
      tbl.string("city", 128).notNullable();
      tbl.string("state", 128).notNullable();
      tbl.string("zipcode", 128).notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("issues").dropTableIfExists("users");
};
