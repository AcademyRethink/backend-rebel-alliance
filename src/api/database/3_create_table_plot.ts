import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("plot", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("user").notNullable();
    table.foreign("user").references("users.cpf_cnpj");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("plot");
}
