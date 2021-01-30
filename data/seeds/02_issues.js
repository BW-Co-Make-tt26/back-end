exports.seed = function (knex, Promise) {
  return knex("issues").insert([
    {
      issue: "Big Pothole",
      description:
        "There is a giant pothole downtown on Main St. I drove over it last week and now I have to get a new tire. Please fix!!!",
      image:
        "https://images.theconversation.com/files/233448/original/file-20180824-149463-1hzm435.jpg",
      city: "Chicago",
      state: "Illinois",
      zipcode: "60611",
      user_id: 1
    },
    {
      issue: "Crosswalk lights not working",
      description:
        "The crosswalk signs outside the mall have been down for multiple days. Very dangerous for walkers.",
      image:
        "https://ewscripps.brightspotcdn.com/2b/e9/4a6a440e4d7eb29df4711e792210/dangerous-crossings.JPG",
      city: "Houston",
      state: "Texas",
      zipcode: "77001",
      user_id: 2
    },
  ]);
};
