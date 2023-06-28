import knex from "knex";
import config from "../../../knexfile";
import { FarmWhithIDsOfFKs } from "../../types";
const knexInstance = knex(config);

const selectByIdWithoutJoin = async (
  farmId: number
): Promise<FarmWhithIDsOfFKs> => {
  const farm: FarmWhithIDsOfFKs[] = await knexInstance("farm")
    .select("*")
    .where({ id: farmId });

  return farm[0];
};

const selectByNameWhithoutJoin = async (
  farmName: string
): Promise<FarmWhithIDsOfFKs> => {
  const farm: FarmWhithIDsOfFKs[] = await knexInstance("farm")
    .select("*")
    .where("name", "like", `%${farmName}%`);

  return farm[0];
};

export default { selectByIdWithoutJoin, selectByNameWhithoutJoin };
