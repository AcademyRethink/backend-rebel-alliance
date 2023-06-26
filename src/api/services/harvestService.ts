import harvestRepository from "../repositories/harvestRepository";

import { HarvestWhithNamesOfFKs } from "../../types";

const getAllPlotsOfTheFarm = async (
  farmId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const plots = await harvestRepository.indexOfTheFarmWithJoin(farmId);

  return plots;
};

export default { getAllPlotsOfTheFarm };
