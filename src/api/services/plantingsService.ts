import {
  ColumnId,
  PlantingsWithIds,
  PlantingsWithNames,
  WhereType,
  QueryStringOrNumber,
} from "../../types/plantingTypes";
import plantingsRepository from "../repositories/plantingsRepository";
import { makeError } from "../middlewares/errorHandler";

const getAllPlantings = async (
  farm: QueryStringOrNumber,
  plot: QueryStringOrNumber,
  date: QueryStringOrNumber
) => {
  const where: WhereType = {};
  if (farm) where["planting.farm_id"] = Number(farm);
  if (plot) where["planting.plot_id"] = Number(plot);
  if (date) where["planting.date"] = date;

  const plantings = await plantingsRepository.selectAllPlantings(where);
  if (!plantings.length) {
    throw makeError({ message: "Plantings not found", status: 400 });
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
  postPlanting,
  updatePlanting,
  deletePlanting,
  selectId,
};
