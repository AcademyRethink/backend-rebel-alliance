import harvestRepository from "../repositories/harvestRepository";
import userRepository from "../repositories/userRepository";
import plotRepository from "../repositories/plotRepository";
import farmRepository from "../repositories/farmRepository";
import { HarvestWhithNamesOfFKs, HarvestWhithIDsOfFKs } from "../../types";
import { makeError } from "../middlewares/errorHandler";

const registerNewHarvest = async (
  harvest: HarvestWhithNamesOfFKs
): Promise<HarvestWhithIDsOfFKs> => {
  const findPlot = await plotRepository.selectByNameWhithoutJoin(
    harvest.plot_name!
  );
  const findUser = await userRepository.selectByNameWithoutJoin(
    harvest.user_name!
  );
  const findFarm = await farmRepository.selectByNameWhithoutJoin(
    harvest.farm_name!
  );

  if (!findPlot) throw makeError({ message: "Plot Not Found", status: 400 });

  if (!findUser) throw makeError({ message: "User Not Found", status: 400 });

  if (!findFarm) throw makeError({ message: "Farm Not Found", status: 400 });

  const newHarvestData: HarvestWhithIDsOfFKs = {
    date: harvest.date,
    bags: harvest.bags,
    plot_id: findPlot.id,
    user_id: findUser.id,
    farm_id: findFarm.id,
  };

  const newHarvest = await harvestRepository.insert(newHarvestData);

  return newHarvest;
};

const getAllHarvestsOfTheFarm = async (
  farmId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const plots = await harvestRepository.selectAllOfTheFarmWithJoin(farmId);

  return plots;
};

const getHarvestsOfTheFarmByPlotId = async (
  farmID: number,
  plotId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const findPlot = await plotRepository.selectByIdWhithoutJoin(plotId);
  if (!findPlot) throw makeError({ message: "Plot Not Found", status: 400 });

  const harvests = await harvestRepository.selectFromFarmByPlotIdWithJoin(
    farmID,
    plotId
  );

  return harvests;
};

const getHarvestsOfTheFarmByDate = async (
  farmID: number,
  harvestDate: string
): Promise<HarvestWhithNamesOfFKs[]> => {
  const findFarm = await farmRepository.selectByIdWithoutJoin(farmID);
  if (!findFarm) throw makeError({ message: "Farm Not Found", status: 400 });

  const harvests = await harvestRepository.selectFromFarmByDateWithJoin(
    farmID,
    harvestDate
  );

  return harvests;
};

export default {
  registerNewHarvest,
  getAllHarvestsOfTheFarm,
  getHarvestsOfTheFarmByPlotId,
  getHarvestsOfTheFarmByDate,
};
