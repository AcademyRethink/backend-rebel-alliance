import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("address", (table) => {
    table.increments();
    table.string("user").notNullable();
    table.foreign("user").references("users.cpf_cnpj");
    table.string("street").notNullable();
    table.integer("number").notNullable();
    table.string("complement").notNullable();
    table.string("neighborhood").notNullable();
    table.string("city").notNullable();
    table.string("state").notNullable();
    table.string("cep").notNullable();
    table.string("reference point").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("address");
}
