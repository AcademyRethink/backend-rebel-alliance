import knex from "knex";
import config from "../../../knexfile";
import { HarvestWhithNamesOfFKs, HarvestWhithIDsOfFKs } from "../../types";
const knexInstance = knex(config);

const insert = async (
  harvestData: HarvestWhithIDsOfFKs
): Promise<HarvestWhithIDsOfFKs> => {
  const newHarvest: HarvestWhithIDsOfFKs[] = await knexInstance("harvest")
    .insert(harvestData)
    .returning(["id", "date", "bags", "plot_id", "user_id", "farm_id"]);

  return newHarvest[0];
};
const selectAllOfTheFarmWithJoin = async (
  farmId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const allPlots = await knexInstance("harvest")
    .select(
      "harvest.date",
      "harvest.bags",
      "plot.name as plot_name",
      "users.name as user_name",
      "farm.name as farm_name"
    )
    .join("plot", "plot.id", "=", "harvest.plot_id")
    .join("users", "users.id", "=", "harvest.user_id")
    .join("farm", "farm.id", "=", "plot.farm_id")
    .where({ "farm.id": farmId });

  return allPlots;
};

// const update = async ( harvestId: number,
//   harvestData: HarvestWhithIDsOfFKs
// ): Promise<HarvestWhithIDsOfFKs> => {
//   const newHarvest: HarvestWhithIDsOfFKs[] = await knexInstance("harvest")
//     .insert(harvestData)
//     .returning(["id", "date", "bags", "plot_id", "user_id", "farm_id"]);

//   return newHarvest[0];
// };
export default { selectAllOfTheFarmWithJoin, insert };
