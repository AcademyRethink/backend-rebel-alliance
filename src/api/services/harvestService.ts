import harvestRepository from "../repositories/harvestRepository";

import { HarvestWhithNamesOfFKs } from "../../types";

const getAllPlotsOfTheFarm = async (
  farmId: number
): Promise<HarvestWhithNamesOfFKs[]> => {
  const plots = await harvestRepository.selectAllOfTheFarmWithJoin(farmId);

  return plots;
};

export default { getAllPlotsOfTheFarm };
