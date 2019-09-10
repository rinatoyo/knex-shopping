exports.up = function(knex) {
  return knex.schema.createTable("products", table => {
    table.increments();
    table.string("title").notNullable();
    table.text("description");
    table
      .integer("inventory")
      .notNullable()
      .defaultTo(0);
    table.decimal("price", 8, 2).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
