import { StagesWithName } from "../../types/stagesTypes";
import stagesRepository from "../repositories/stagesRepository";
import { makeError } from "../middlewares/errorHandler";

const getAllStages = async (): Promise<StagesWithName[]> => {
  const stages: StagesWithName[] = await stagesRepository.selectAllStages();
  if (!stages.length)
    throw makeError({ message: "Stages not found", status: 400 });
  return stages;
};

const getAllStagesOfACulture = async (
  id: number
): Promise<StagesWithName[]> => {
  const stages: StagesWithName[] =
    await stagesRepository.selectAllStagesOfACulture(id);
  if (!stages.length)
    throw makeError({ message: "Stages not found", status: 400 });
  return stages;
};

export default { getAllStages, getAllStagesOfACulture };
