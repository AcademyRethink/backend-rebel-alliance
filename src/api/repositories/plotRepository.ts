import knex from "knex";
import config from "../../../knexfile";
import { PlotWhithIDsOfFKs } from "../../types";
const knexInstance = knex(config);

const selectByIdWhithoutJoin = async (plotId: number) => {
  const plot: PlotWhithIDsOfFKs[] = await knexInstance("plot")
    .select("*")
    .where({ id: plotId });

  return plot[0];
};

const selectByNameWhithoutJoin = async (plotName: string) => {
  const plot: PlotWhithIDsOfFKs[] = await knexInstance("plot")
    .select("*")
    .where("name", "like", `%${plotName}%`);
  return plot[0];
};

export default { selectByIdWhithoutJoin, selectByNameWhithoutJoin };
