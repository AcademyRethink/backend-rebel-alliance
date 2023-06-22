import type { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  migrations: {
    directory: "src/api/database",
  },
  useNullAsDefault: true,
};

export default config;
