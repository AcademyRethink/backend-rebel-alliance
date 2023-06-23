import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("farm", (table) => {
    table.string("cnpj").primary().notNullable();
    table.string("name").notNullable();
    table.string("phone").notNullable();
    table.integer("address").notNullable();
    table.foreign("address").references("address.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("farm");
}
