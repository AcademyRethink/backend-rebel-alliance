import knex from "knex";
import config from "../../../knexfile";
import { PlantingsWitNames } from "../../types/plantingTypes";

const knexInstance = knex(config);

const selectAllPlantings = (): Promise<PlantingsWitNames[]> => {
  return knexInstance("planting")
    .select(
      "planting.id",
      "planting.date",
      "planting.saplings",
      "plot.name as plot",
      "stages.stage as stage",
      "users.name as user",
      "farm.name as farm"
    )
    .join("plot", "plot.id", "=", "planting.plot_id")
    .join("stages", "stages.id", "=", "planting.stages_id")
    .join("users", "users.id", "=", "planting.user_id")
    .join("farm", "farm.id", "=", "planting.farm_id");
};

const selectAllPlantingsOfAUser = (
  id: number
): Promise<PlantingsWitNames[]> => {
  return knexInstance("planting")
    .where({ farm: id })
    .select(
      "planting.id",
      "planting.date",
      "planting.saplings",
      "plot.name as plot",
      "stages.stage as stage",
      "users.name as user",
      "farm.name as farm"
    )
    .join("plot", "plot.id", "=", "planting.plot_id")
    .join("stages", "stages.id", "=", "planting.stages_id")
    .join("users", "users.id", "=", "planting.user_id")
    .join("farm", "farm.id", "=", "planting.farm_id");
};

export default { selectAllPlantings, selectAllPlantingsOfAUser };
