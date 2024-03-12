/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("highlight", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("highlight_passage").notNullable();
    table
      .integer("group_id")
      .notNullable()
      .unsigned()
      .references("group.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("domain").notNullable();
    table.string("domain_path").notNullable();
    table.string("favicon_url");
    table.boolean("star_status");
    table.integer("visit_count");
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
  return knex.schema.dropTable("group");
};
