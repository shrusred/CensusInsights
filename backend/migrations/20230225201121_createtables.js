exports.up = function (knex) {
  return knex.schema.createTable("assignment", (table) => {
    table.string("fieldagentid").notNullable();
    table.increments("id").primary();
    table.string("street").notNullable();
    table.string("city").notNullable();
    table.string("province").notNullable();
    table.string("postalcode").notNullable();
    table.timestamp("assignmentdate").notNullable().defaultTo(knex.fn.now());
    table.float("latitude").notNullable();
    table.float("longitude").notNullable();
    table.string("imagepath");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("assignment");
};
