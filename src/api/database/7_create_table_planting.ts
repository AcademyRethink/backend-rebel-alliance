import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("planting", (table) => {
    table.increments();
    table.date("date").notNullable();
    table.integer("saplings").notNullable();
    table.integer("plot_id").notNullable();
    table.foreign("plot_id").references("plot.id");
    table.integer("stages_id").notNullable();
    table.foreign("stages_id").references("stages.id");
    table.string("user").notNullable();
    table.foreign("user").references("users.cpf_cnpj");
    table.string("farm").notNullable();
    table.foreign("farm").references("farm.cnpj");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("planting");
}
