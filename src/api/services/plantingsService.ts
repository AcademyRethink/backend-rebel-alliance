import {
  ColumnId,
  PlantingsWithIds,
  PlantingsWithNames,
} from "../../types/plantingTypes";
import plantingsRepository from "../repositories/plantingsRepository";
import { makeError } from "../middlewares/errorHandler";
// import { ErrorType } from "../../types";

const getAllPlantings = async (): Promise<PlantingsWithNames[]> =>
  await plantingsRepository.selectAllPlantings();

const getllPlantingsOfAUser = async (
  id: number
): Promise<PlantingsWithNames[]> => {
  const plantings: PlantingsWithNames[] =
    await plantingsRepository.selectAllPlantingsOfAUser(id);
  if (!plantings.length) {
    makeError({ message: "Farm not found", status: 400 });
  }
  return plantings;
};

const postPlanting = async (planting: PlantingsWithNames) => {
  const { plot, stage, user, farm, ...data }: PlantingsWithNames = planting;

  const plotResult: ColumnId[] = await plantingsRepository.selectId(
    "plot",
    "name",
    plot
  );
  const stageResult: ColumnId[] = await plantingsRepository.selectId(
    "stages",
    "stage",
    stage
  );
  const userResult: ColumnId[] = await plantingsRepository.selectId(
    "users",
    "name",
    user
  );
  const farmResult: ColumnId[] = await plantingsRepository.selectId(
    "farm",
    "name",
    farm
  );

  const plotId: number | null = plotResult.length > 0 ? plotResult[0].id : null;
  const stageId: number | null =
    stageResult.length > 0 ? stageResult[0].id : null;
  const userId: number | null = userResult.length > 0 ? userResult[0].id : null;
  const farmId: number | null = farmResult.length > 0 ? farmResult[0].id : null;

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

export default { getAllPlantings, getllPlantingsOfAUser, postPlanting };
