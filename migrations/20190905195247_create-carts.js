exports.up = function(knex) {
  return knex.schema.createTable("carts", table => {
    table.increments();
    table.integer("user_id").notNullable();
    table.integer("products_id").notNullable();
    table.timestamps(true, true);

    table
      .foreign("user_id")
      .references("id")
      .inTable("users");
    table
      .foreign("products_id")
      .references("id")
      .inTable("products");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("carts");
};
