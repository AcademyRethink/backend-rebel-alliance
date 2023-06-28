import {
  ColumnId,
  PlantingsWithIds,
  PlantingsWithNames,
} from "../../types/plantingTypes";
import plantingsRepository from "../repositories/plantingsRepository";
import { makeError } from "../middlewares/errorHandler";

const getAllPlantings = async (): Promise<PlantingsWithNames[]> => {
  const plantings = await plantingsRepository.selectAllPlantings();
  if (!plantings.length) {
    throw makeError({ message: "Plantings not found", status: 400 });
  }
  return plantings;
};

const getllPlantingsOfAUser = async (
  id: number
): Promise<PlantingsWithNames[]> => {
  const plantings: PlantingsWithNames[] =
    await plantingsRepository.selectAllPlantingsOfAUser(id);
  if (!plantings.length) {
    throw makeError({
      message: "Farm not found or there are no plantations",
      status: 400,
    });
  }
  return plantings;
};

const postPlanting = async (planting: PlantingsWithNames): Promise<string> => {
  const { plot, stage, user, farm, ...data }: PlantingsWithNames = planting;
  const plotId: number | null = await selectId("plot", "name", plot);
  const stageId: number | null = await selectId("stages", "stage", stage);
  const userId: number | null = await selectId("users", "cpf_cnpj", user);
  const farmId: number | null = await selectId("farm", "name", farm);

  if (plotId && stageId && userId && farmId) {
    const formatedPlanting: PlantingsWithIds = {
      plot_id: plotId,
      stages_id: stageId,
      user_id: userId,
      farm_id: farmId,
      ...data,
    };

    await plantingsRepository.insertPlanting(formatedPlanting);
    return "Registered planting";
  } else {
    throw makeError({
      message: "Some ID can not found",
      status: 400,
    });
  }
};

const updatePlanting = async (
  id: number,
  planting: PlantingsWithNames
): Promise<string> => {
  const { plot, stage, user, farm, ...data }: PlantingsWithNames = planting;
  const plotId: number | null = await selectId("plot", "name", plot);
  const stageId: number | null = await selectId("stages", "stage", stage);
  const userId: number | null = await selectId("users", "cpf_cnpj", user);
  const farmId: number | null = await selectId("farm", "name", farm);

  if (plotId && stageId && userId && farmId) {
    const formatedPlanting: PlantingsWithIds = {
      plot_id: plotId,
      stages_id: stageId,
      user_id: userId,
      farm_id: farmId,
      ...data,
    };

    await plantingsRepository.updatePlanting(id, formatedPlanting);
    return "Planting has been updated";
  } else {
    throw makeError({
      message: "Some ID can not found",
      status: 400,
    });
  }
};

const deletePlanting = async (id: number): Promise<string> => {
  const planting: number = await plantingsRepository.deletePlanting(id);
  if (!planting)
    throw makeError({ message: "Planting not found", status: 400 });
  return "Planting has benn deleted";
};

const getAllPlantingsOfAUserByPlot = async (
  farmId: number,
  plotId: number
): Promise<PlantingsWithNames[]> => {
  const plantings: PlantingsWithNames[] =
    await plantingsRepository.selectAllPlantingsOfAUserByPlot(farmId, plotId);
  if (!plantings.length) {
    throw makeError({
      message: "Farm not found or there are no plantations",
      status: 400,
    });
  }
  return plantings;
};

const getAllPlantingsOfAUserByDate = async (
  farmId: number,
  date: string
): Promise<PlantingsWithNames[]> => {
  const plantings: PlantingsWithNames[] =
    await plantingsRepository.selectAllPlantingsOfAUserByDate(farmId, date);
  if (!plantings.length) {
    throw makeError({
      message: "Farm not found or there are no plantations",
      status: 400,
    });
  }
  return plantings;
};

const getAllPlantingsOfAUserByPlotAndByDate = async (
  farmId: number,
  plotId: number,
  date: string
): Promise<PlantingsWithNames[]> => {
  const plantings: PlantingsWithNames[] =
    await plantingsRepository.selectAllPlantingsOfAUserByPlotAndByDate(
      farmId,
      plotId,
      date
    );
  if (!plantings.length) {
    throw makeError({
      message: "Farm not found or there are no plantations",
      status: 400,
    });
  }
  return plantings;
};
const selectId = async (
  tableName: string,
  columnName: string,
  value: string
): Promise<number | null> => {
  const result: ColumnId[] = await plantingsRepository.selectId(
    tableName,
    columnName,
    value
  );
  return result.length > 0 ? result[0].id : null;
};

export default {
  getAllPlantings,
  getllPlantingsOfAUser,
  postPlanting,
  updatePlanting,
  deletePlanting,
  getAllPlantingsOfAUserByPlot,
  getAllPlantingsOfAUserByDate,
  getAllPlantingsOfAUserByPlotAndByDate,
  selectId,
};
