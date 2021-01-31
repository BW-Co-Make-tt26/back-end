
exports.seed = function (knex, Promise) {
      return knex("users").insert([
        {first_name: "joe", last_name: "mama", email: "j@m.com", username: "joemama", password: "$2a$04$ynf3Vmlw.N6oCOAtwlhid.77RnRTONWk2Cn12Z5GGVfzrVlG6oKg." },
        {first_name: "lebron", last_name: "james", email: "king@james.com", username: "kingjames", password: "$2a$04$T9E9ljfDfN.j8gGIgsALM.KXC/0HG0K4e0q/hRxriyTsLHOw4n3Zu" },
      ]);
};
