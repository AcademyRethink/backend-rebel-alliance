import type { Knex } from "knex";
import * as dotenv from "dotenv";
dotenv.config();

const config: Knex.Config = {
  client: "pg",
  connection:
    "postgres://postgres:@FeedQUEM2023@db.butcagyhctuhddxzrgqy.supabase.co:6543/postgres",
  migrations: {
    directory: "src/api/database",
  },
  useNullAsDefault: true,
};

export default config;
