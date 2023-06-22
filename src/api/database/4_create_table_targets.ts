import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("targets", (table) => {
    table.increments();
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.string("description").notNullable();
    table.float("objective").notNullable();
    table.float("progress").notNullable();
    table.date("start_date").notNullable();
    table.date("target_date").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("targets");
}
