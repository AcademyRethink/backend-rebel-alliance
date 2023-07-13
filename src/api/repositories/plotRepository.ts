import knex from "knex";
import config from "../../../knexfile";
import { PlotWithPlatingData, PlotWhithIDsOfFKs } from "../../types/plotTypes";
const knexInstance = knex(config);

const selectPlotsByFarmId = async (
  farm_id: number
): Promise<PlotWhithIDsOfFKs[]> => {
  const plot: PlotWhithIDsOfFKs[] = await knexInstance("plot")
    .select("*")
    .where({ farm_id });

  return plot;
};

const selectPlotByFarmIdWithJoin = (
  farm_id: number
): Promise<PlotWithPlatingData[]> =>
  knexInstance("plot")
    .select(
      "plot.farm_id",
      "plot.id as plot_id",
      "plot.name as plot_name",
      "planting.id as planting_id",
      "planting.date as planting_date",
      "planting.saplings",
      "stages.stage"
    )
    .join("planting", "plot.id", "=", "planting.plot_id")
    .join("stages", "stages.id", "=", "planting.stages_id")
    .leftJoin("harvest", "planting.id", "=", "harvest.planting_id")
    .where({ "plot.farm_id": farm_id, "planting.active": true })
    .groupBy("plot.id", "planting.id", "stages.stage")
    .count("harvest.id as harvests");

const insertPlot = async (
  plot: PlotWhithIDsOfFKs
): Promise<PlotWhithIDsOfFKs> => {
  return await knexInstance("plot")
    .insert(plot)
    .returning(["id", "name", "farm_id"]);
};

const updatePlot = async (
  id: number,
  plot: PlotWhithIDsOfFKs
): Promise<PlotWhithIDsOfFKs> => {
  return await knexInstance("plot")
    .update(plot)
    .where({ id })
    .returning(["id", "name", "farm_id"]);
};

const deletePlot = async (id: number): Promise<PlotWhithIDsOfFKs> => {
  return (
    await knexInstance("plot")
      .delete()
      .where({ id })
      .returning(["id", "name", "farm_id"])
  )[0];
};

const selectPlotByIdAndFarmId = async (
  id: number,
  farm_id: number
): Promise<PlotWhithIDsOfFKs | undefined> => {
  return (await knexInstance("plot").select("*").where({ id, farm_id }))[0];
};

const selectByIdWhithoutJoin = async (
  plotId: number
): Promise<PlotWhithIDsOfFKs | undefined> => {
  const plot: PlotWhithIDsOfFKs[] = await knexInstance("plot")
    .select("*")
    .where({ id: plotId });

  return plot[0];
};

const selectByNameWhithoutJoin = async (
  plotName: string
): Promise<PlotWhithIDsOfFKs | undefined> => {
  const plot: PlotWhithIDsOfFKs[] = await knexInstance("plot")
    .select("*")
    .where("name", "ilike", `%${plotName}%`);
  return plot[0];
};

const selectByNameAndFarmID = async (
  farm_id: number,
  plotName: string
): Promise<PlotWhithIDsOfFKs | undefined> => {
  const plot: PlotWhithIDsOfFKs[] = await knexInstance("plot")
    .select("*")
    .where({ farm_id })
    .andWhere("name", "ilike", `%${plotName}%`);
  return plot[0];
};

export default {
  selectPlotsByFarmId,
  selectPlotByFarmIdWithJoin,
  insertPlot,
  updatePlot,
  deletePlot,
  selectPlotByIdAndFarmId,
  selectByIdWhithoutJoin,
  selectByNameWhithoutJoin,
  selectByNameAndFarmID,
};

// selectByNameAndFarmID(2, "plot").then(console.log).catch(console.log);
