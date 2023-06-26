import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("plot", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.integer("farm").notNullable();
    table.foreign("farm").references("farm.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("plot");
}
