exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { email: "ed@devleague.com", password: "edPW" },
        { email: "jason@devleague.com", password: "jasonPW" },
        { email: "mel@devleague.com", password: "melPW" }
      ]);
    });
};
