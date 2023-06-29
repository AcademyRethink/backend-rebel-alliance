import stagesService from "../api/services/stagesService";
import stagesRepository from "../api/repositories/stagesRepository";
import { describe, expect, jest } from "@jest/globals";
import { stageData } from "./mockStages";
import { StagesWithName } from "../types/stagesTypes";
describe("Stages Tests", () => {
  it("Read All Stagees", async () => {
    jest
      .spyOn(stagesRepository, "selectAllStages")
      .mockResolvedValueOnce([stageData]);
    const result: StagesWithName[] = await stagesService.getAllStages();
    expect(result).toMatchObject([stageData]);
  });
  it("Stages not found", async () => {
    jest.spyOn(stagesRepository, "selectAllStages").mockResolvedValueOnce([]);
    try {
      await stagesService.getAllStages();
    } catch (error) {
      expect(error).toMatchObject({
        message: "Stages not found",
        status: 400,
      });
    }
  });
  it("Read All Stages of a Culture", async () => {
    jest
      .spyOn(stagesRepository, "selectAllStagesOfACulture")
      .mockResolvedValueOnce([stageData]);
    const result: StagesWithName[] = await stagesService.getAllStagesOfACulture(
      1
    );
    expect(result).toMatchObject([stageData]);
  });
  it("Stages not found - All Stages of a culture", async () => {
    jest
      .spyOn(stagesRepository, "selectAllStagesOfACulture")
      .mockResolvedValueOnce([]);
    try {
      await stagesService.getAllStagesOfACulture(0);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Stages not found",
        status: 400,
      });
    }
  });
});
