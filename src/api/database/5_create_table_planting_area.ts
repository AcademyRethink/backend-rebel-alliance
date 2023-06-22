import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("planting_area", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("user");
    table.string("name").notNullable();
    table.float("total_area").notNullable();
    table.float("used_area").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("planting_area");
}
