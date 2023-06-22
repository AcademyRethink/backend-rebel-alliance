import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("cpf_cnpj").notNullable();
    table.string("name").notNullable();
    table.date("birthday").notNullable();
    table.string("phone").notNullable();
    table.string("celphone").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("userType").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}
