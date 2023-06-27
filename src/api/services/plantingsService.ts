import {
  ColumnId,
  PlantingsWithIds,
  PlantingsWithNames,
} from "../../types/plantingTypes";
import plantingsRepository from "../repositories/plantingsRepository";
import { makeError } from "../middlewares/errorHandler";

const getAllPlantings = async (): Promise<PlantingsWithNames[]> =>
  await plantingsRepository.selectAllPlantings();

const getllPlantingsOfAUser = async (
  id: number
): Promise<PlantingsWithNames[]> => {
  const plantings: PlantingsWithNames[] =
    await plantingsRepository.selectAllPlantingsOfAUser(id);
  if (!plantings.length) {
    throw makeError({ message: "Farm not found", status: 400 });
  }
  return plantings;
};

const postPlanting = async (planting: PlantingsWithNames) => {
  const { plot, stage, user, farm, ...data }: PlantingsWithNames = planting;

  const plotId: number | null = await selectId("plot", "name", plot);
  const stageId: number | null = await selectId("stages", "stage", stage);
  const userId: number | null = await selectId("users", "cpf_cnpj", user);
  const farmId: number | null = await selectId("farm", "name", farm);

  if (plotId && stageId && userId && farmId) {
    const formatedPlanting: PlantingsWithIds = {
      ...data,
      plot_id: plotId,
      stages_id: stageId,
      user_id: userId,
      farm_id: farmId,
    };

    await plantingsRepository.insertPlanting(formatedPlanting);
  } else {
    throw makeError({
      message: "Some ID can not found",
      status: 400,
    });
  }
};

const updatePlanting = async (id: number, planting: PlantingsWithNames) => {
  const { plot, stage, user, farm, ...data }: PlantingsWithNames = planting;

  const plotId: number | null = await selectId("plot", "name", plot);
  const stageId: number | null = await selectId("stages", "stage", stage);
  const userId: number | null = await selectId("users", "cpf_cnpj", user);
  const farmId: number | null = await selectId("farm", "name", farm);

  if (plotId && stageId && userId && farmId) {
    const formatedPlanting: PlantingsWithIds = {
      ...data,
      plot_id: plotId,
      stages_id: stageId,
      user_id: userId,
      farm_id: farmId,
    };

    await plantingsRepository.updatePlanting(id, formatedPlanting);
  } else {
    throw makeError({
      message: "Some ID can not found",
      status: 400,
    });
  }
};

const deletePlanting = async (id: number): Promise<number> => {
  const planting: number = await plantingsRepository.deletePlanting(id);
  if (!planting)
    throw makeError({ message: "Planting not found", status: 400 });
  return planting;
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
};
