import type { Knex } from "knex";

const config: Knex.Config = {
  client: "pg",
  connection: "",
  migrations: {
    directory: "src/api/database",
  },
  useNullAsDefault: true,
};

export default config;
