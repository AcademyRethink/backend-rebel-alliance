import { PlantingsWitNames } from "../../types/plantingTypes";
import plantingsRepositorie from "../repositories/plantingsRepositorie";

const getAllPlantings = async (): Promise<PlantingsWitNames[]> => {
  return await plantingsRepositorie.selectAllPlantings();
};

export default { getAllPlantings };
