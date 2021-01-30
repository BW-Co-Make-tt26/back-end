
exports.seed = function (knex, Promise) {
      return knex("users").insert([
        {first_name: "joe", last_name: "mama", email: "j@m.com", username: "joemama", password: "1234" },
        {first_name: "lebron", last_name: "james", email: "king@james.com", username: "kingjames", password: "1234" },
      ]);
};
