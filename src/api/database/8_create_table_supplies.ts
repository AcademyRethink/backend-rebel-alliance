import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("supplies", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.string("item").notNullable();
    table.float("capacity").notNullable();
    table.float("available").notNullable();
    table.string("measurement_unit").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("supplies");
}
