import knex from "knex";
import config from "../../../knexfile";
import { PlotWhithIDsOfFKs } from "../../types";
const knexInstance = knex(config);

const selectPlotsByFarmId = async (
  farm_id: number
): Promise<PlotWhithIDsOfFKs[]> => {
  const plot: PlotWhithIDsOfFKs[] = await knexInstance("plot")
    .select("*")
    .where({ farm_id });

  return plot;
};

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
): Promise<PlotWhithIDsOfFKs> => {
  return (await knexInstance("plot").select("*").where({ id, farm_id }))[0];
};

const selectByIdWhithoutJoin = async (plotId: number) => {
  const plot: PlotWhithIDsOfFKs[] = await knexInstance("plot")
    .select("*")
    .where({ id: plotId });

  return plot[0];
};

const selectByNameWhithoutJoin = async (plotName: string) => {
  const plot: PlotWhithIDsOfFKs[] = await knexInstance("plot")
    .select("*")
    .where("name", "ilike", `%${plotName}%`);
  return plot[0];
};

export default {
  selectPlotsByFarmId,
  insertPlot,
  updatePlot,
  deletePlot,
  selectPlotByIdAndFarmId,
  selectByIdWhithoutJoin,
  selectByNameWhithoutJoin,
};
