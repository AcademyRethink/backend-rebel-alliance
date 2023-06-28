import knex from "knex";
import config from "../../../knexfile";
import { UsersWhithIDsOfFKs } from "../../types";

const knexInstance = knex(config);

const selectByIdWithoutJoin = async (
  userId: number
): Promise<UsersWhithIDsOfFKs> => {
  const user: UsersWhithIDsOfFKs[] = await knexInstance("users")
    .select("*")
    .where({ id: userId });

  return user[0];
};

const selectByNameWithoutJoin = async (
  userName: string
): Promise<UsersWhithIDsOfFKs> => {
  const user: UsersWhithIDsOfFKs[] = await knexInstance("users")
    .select("*")
    .whereRaw("name LIKE ?", [`%${userName}%`]);

  return user[0];
};

export default { selectByIdWithoutJoin, selectByNameWithoutJoin };
