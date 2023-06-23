import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.string("cpf_cnpj").primary().notNullable();
    table.string("name").notNullable();
    table.string("celphone").notNullable();
    table.string("email");
    table.string("password").notNullable();
    table.string("userType").notNullable();
    table.string("farm").notNullable();
    table.foreign("farm").references("farm.cnpj");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
