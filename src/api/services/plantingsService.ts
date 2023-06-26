import { PlantingsWitNames } from "../../types/plantingTypes";
import plantingsRepository from "../repositories/plantingsRepository";
import { makeError } from "../middlewares/errorHandler";

const getAllPlantings = async (): Promise<PlantingsWitNames[]> =>
  await plantingsRepository.selectAllPlantings();

const getllPlantingsOfAUser = async (
  id: number
): Promise<PlantingsWitNames[]> => {
  const plantings: PlantingsWitNames[] =
    await plantingsRepository.selectAllPlantingsOfAUser(id);
  if (!plantings.length) {
    const error = makeError({ message: "Farm not found", status: 400 });
    return [error] as PlantingsWitNames[];
  }
  return plantings;
};

export default { getAllPlantings, getllPlantingsOfAUser };
