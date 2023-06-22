import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("weather", (table) => {
    table.increments();
    table.date("date").notNullable();
    table.string("day").notNullable();
    table.string("temperature").notNullable();
    table.string("status").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("weather");
}
