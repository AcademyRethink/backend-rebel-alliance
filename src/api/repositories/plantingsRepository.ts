import knex from "knex";
import config from "../../../knexfile";
import {
  PlantingsWithIds,
  PlantingsWithNames,
  ColumnId,
} from "../../types/plantingTypes";

const knexInstance = knex(config);

const selectAllPlantings = (): Promise<PlantingsWithNames[]> =>
  knexInstance("planting")
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

const selectAllPlantingsOfAUser = (id: number): Promise<PlantingsWithNames[]> =>
  knexInstance("planting")
    .where({ "planting.farm_id": id })
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

const selectId = (
  tableName: string,
  columnName: string,
  value: string
): Promise<Array<ColumnId>> =>
  knexInstance(tableName).select("id").where(columnName, "=", value);

const insertPlanting = (planting: PlantingsWithIds): Promise<Array<number>> =>
  knexInstance("planting").insert(planting);

const updatePlanting = (
  id: number,
  planting: PlantingsWithIds
): Promise<number> => knexInstance("planting").update(planting).where({ id });

const deletePlanting = (id: number): Promise<number> =>
  knexInstance("planting").delete().where({ id });

const selectAllPlantingsOfAUserByPlot = (
  farmId: number,
  plotId: number
): Promise<PlantingsWithNames[]> =>
  knexInstance("planting")
    .where({ "planting.farm_id": farmId, "planting.plot_id": plotId })
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

const selectAllPlantingsOfAUserByDate = (
  farmId: number,
  date: string
): Promise<PlantingsWithNames[]> =>
  knexInstance("planting")
    .where({ "planting.farm_id": farmId, "planting.date": date })
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

const selectAllPlantingsOfAUserByPlotAndByDate = (
  farmId: number,
  plotId: number,
  date: string
): Promise<PlantingsWithNames[]> =>
  knexInstance("planting")
    .where({
      "planting.farm_id": farmId,
      "planting.plot_id": plotId,
      "planting.date": date,
    })
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
export default {
  selectAllPlantings,
  selectAllPlantingsOfAUser,
  insertPlanting,
  selectId,
  updatePlanting,
  deletePlanting,
  selectAllPlantingsOfAUserByPlot,
  selectAllPlantingsOfAUserByDate,
  selectAllPlantingsOfAUserByPlotAndByDate,
};
