import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("harvest", (table) => {
    table.increments();
    table.date("date").notNullable();
    table.float("bags").notNullable();
    table.integer("plot_id").notNullable();
    table.foreign("plot_id").references("plot.id");
    table.string("user").notNullable();
    table.foreign("user").references("users.cpf_cnpj");
    table.string("farm").notNullable();
    table.foreign("farm").references("farm.cnpj");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("harvest");
}
