import { PlotWhithIDsOfFKs, PlotWithFarmName } from "../../types/plotTypes";
import plotRepository from "../repositories/plotRepository";
import farmRepository from "../repositories/farmRepository";
import { makeError } from "../middlewares/errorHandler";
import { FarmWhithIDsOfFKs } from "../../types";

const getPlotsInFarm = async (
  farm_id: number
): Promise<PlotWhithIDsOfFKs[]> => {
  const existsFarm: FarmWhithIDsOfFKs | undefined =
    await farmRepository.selectByIdWithoutJoin(farm_id);

  if (!existsFarm)
    throw makeError({ message: "The farm does not exist!", status: 400 });

  return await plotRepository.selectPlotsByFarmId(farm_id);
};

const postPlot = async (plot: PlotWithFarmName): Promise<PlotWhithIDsOfFKs> => {
  const existsPlot: PlotWhithIDsOfFKs | undefined =
    await plotRepository.selectByNameWhithoutJoin(plot.name);
  if (existsPlot)
    throw makeError({ message: "The plot already exists!", status: 400 });

  const farm: FarmWhithIDsOfFKs | undefined =
    await farmRepository.selectByNameWhithoutJoin(plot.farm);
  if (!farm)
    throw makeError({ message: "The farm doesn't exist!", status: 400 });

  const newPlot: PlotWhithIDsOfFKs = { name: plot.name, farm_id: farm.id };

  try {
    return await plotRepository.insertPlot(newPlot);
  } catch (error) {
    throw error;
  }
};

const updatePlot = async (
  id: number,
  plot: PlotWithFarmName
): Promise<PlotWhithIDsOfFKs> => {
  const farm: FarmWhithIDsOfFKs | undefined =
    await farmRepository.selectByNameWhithoutJoin(plot.farm);
  if (!farm)
    throw makeError({ message: "The farm does not exist!", status: 400 });

  const existsPlot: PlotWhithIDsOfFKs | undefined =
    await plotRepository.selectPlotByIdAndFarmId(id, farm.id!);
  if (!existsPlot)
    throw makeError({
      message:
        "The plot does not exist or does not belong to the indicated farm!",
      status: 400,
    });

  try {
    return await plotRepository.updatePlot(id, {
      name: plot.name,
    });
  } catch (error) {
    throw error;
  }
};

const deletePlot = async (id: number): Promise<PlotWhithIDsOfFKs> => {
  const existsPlot: PlotWhithIDsOfFKs | undefined =
    await plotRepository.selectByIdWhithoutJoin(id);
  if (!existsPlot)
    throw makeError({
      message: "The plot does not exist!",
      status: 400,
    });

  try {
    return await plotRepository.deletePlot(id);
  } catch (error) {
    throw error;
  }
};

export default { getPlotsInFarm, postPlot, updatePlot, deletePlot };
