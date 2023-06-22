import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("address", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
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
