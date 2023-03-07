exports.up = function (knex) {
  return knex.schema
    .createTable("geo", (table) => {
      table.integer("regionid").notNullable().primary();
      table.string("region_name").notNullable();
      table.integer("municipalid").notNullable().unsigned();
      table.string("municipality_name").notNullable();
    })
    .createTable("manager", (table) => {
      table.increments("managerid").primary();
      table.string("managername").notNullable();
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.string("role").notNullable().defaultTo("manager");
      ///////   foreign keys   //////////
      // table.integer("region_id").unsigned();
      // table.foreign("region_id").references("geo.regionid");
    })
    .createTable("fieldagent", (table) => {
      table.increments("fieldagentid").primary();
      table.string("fieldagentname").notNullable();
      table.string("username").notNullable();
      table.string("password").notNullable();
      table.string("role").notNullable().defaultTo("fieldagent");
      table.integer("latitude");
      table.integer("longitude");
      ///////   foreign keys   //////////
      // table.integer("manager_id").unsigned();
      // table.integer("municipal_id").unsigned();
      // table.foreign("manager_id").references("manager.managerid");
      // table.foreign("municipal_id").references("geo.municipalid");
    })
    .createTable("assignments", (table) => {
      table.increments("assignmentid").primary();
      table.string("street").notNullable();
      table.string("city").notNullable();
      table.string("province").notNullable();
      table.string("postalcode").notNullable();
      table.date("assignment_date").notNullable();
      table.decimal("latitude", 5, 5).notNullable();
      table.decimal("longitude", 5, 5).notNullable();
      ////////   foreign keys   ////////////
      // table.integer("fieldagent_id").unsigned();
      // table.foreign("fieldagent_id").references("fieldagent.fieldagentid");
    })
    .createTable("censusdata", (table) => {
      table.integer("householdnumber").notNullable();
      table.string("ethnicity").notNullable();
      table.string("age").notNullable();
      table.string("income").notNullable();
      table.string("gender").notNullable();
      table.string("occupation").notNullable();
      ////////   foreign keys   ///////////
      // table.integer("assignment_id").unsigned();
      // table.foreign("assignment_id").references("assignments.assignmentid");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable("censusdata")
    .dropTable("assignments")
    .dropTable("fieldagent")
    .dropTable("manager")
    .dropTable("geo");
};
