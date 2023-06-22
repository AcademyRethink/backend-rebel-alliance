import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("harvest", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.date("date").notNullable();
    table.float("quantity").notNullable();
    table.integer("area_id").notNullable();
    table.foreign("area_id").references("planting_area.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("harvest");
}
