/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("highlight", (table) => {
    table.increments("id").primary();
    table.string("highlight").notNullable();
    table.string("domain").notNullable();
    table.string("domain_path").notNullable();
    table.string("favicon_url");
    table.string("group_array").notNullable();
    table.string("keyword_array").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("highlight");
};
