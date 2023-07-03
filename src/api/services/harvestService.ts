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
  const findFarm = await farmRepository.selectByIdWithoutJoin(farmID);
  if (!findFarm) throw makeError({ message: "Farm Not Found", status: 400 });

  const findPlot = await plotRepository.selectByIdWhithoutJoin(plotId);
  if (!findPlot) throw makeError({ message: "Plot Not Found", status: 400 });

  if (findPlot.farm_id != findFarm.id)
    throw makeError({
      message: "Plot does not belong to the farm",
      status: 400,
    });

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

const getHarvestOfTheFarmByDateAndPlot = async (
  farmID: number,
  plotId: number,
  harvestDate: string
): Promise<HarvestWhithNamesOfFKs[]> => {
  const findPlot = await plotRepository.selectByIdWhithoutJoin(plotId);
  if (!findPlot) throw makeError({ message: "Plot Not Found", status: 400 });

  const findFarm = await farmRepository.selectByIdWithoutJoin(farmID);
  if (!findFarm) throw makeError({ message: "Farm Not Found", status: 400 });

  const harvests = await harvestRepository.selectFromFarmByDateAndPlotWithJoin(
    farmID,
    plotId,
    harvestDate
  );

  return harvests;
};

const updateHarvest = async (
  harvestID: number,
  harvestData: HarvestWhithNamesOfFKs
) => {
  if (harvestData.plot_name) {
    const findPlot = await plotRepository.selectByNameWhithoutJoin(
      harvestData.plot_name
    );
    if (!findPlot)
      throw makeError({ message: "New Plot Not Found", status: 400 });
  }
  if (harvestData.user_name) {
    const findUser = await userRepository.selectByNameWithoutJoin(
      harvestData.user_name!
    );
    if (!findUser)
      throw makeError({ message: "New User Not Found", status: 400 });
  }

  if (harvestData.farm_name) {
    const findFarm = await farmRepository.selectByNameWhithoutJoin(
      harvestData.farm_name
    );
    if (!findFarm)
      throw makeError({ message: "New Farm Not Found", status: 400 });
  }

  const newData = harvestData;

  const newHarvestData = await harvestRepository.updateHarvest(
    harvestID,
    newData
  );

  return newHarvestData;
};

const deleteHarvest = async (harvestId: number) => {
  const isDeleted = await harvestRepository.deleteHarvest(harvestId);

  if (isDeleted) return { message: "Harvest deleted successfully" };
  return { message: "Harvest not deleted" };
};

export default {
  registerNewHarvest,
  getAllHarvestsOfTheFarm,
  getHarvestsOfTheFarmByPlotId,
  getHarvestsOfTheFarmByDate,
  getHarvestOfTheFarmByDateAndPlot,
  updateHarvest,
  deleteHarvest,
};
