import knex from "knex";
import config from "../../../knexfile";
import { HarvestWhithNamesOfFKs } from "../../types";
const knexInstance = knex(config);

const indexOfTheFarmWithJoin = async (
  farmId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const allPlots = await knexInstance("harvest")
    .select(
      "harvest.date",
      "harvest.bags",
      "plot.name as plot_name",
      "user.name as user_name",
      "farm.name as farm_name"
    )
    .join("plot", "plot.id", "=", "harvest.plot_id")
    .join("user", "user.id", "=", "harvest.user_id")
    .join("farm", "farm.id", "=", "plot.farm_id")
    .where({ "farm.id": farmId });

  return allPlots;
};

export default { indexOfTheFarmWithJoin };
