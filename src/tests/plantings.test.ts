import plantingsService from "../api/services/plantingsService";
import plantingsRepository from "../api/repositories/plantingsRepository";
import { describe, expect, jest } from "@jest/globals";
import { plantingData } from "./mockPlantings";

describe("Plantings Tests", () => {
  it("Read All Plantings", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantings")
      .mockResolvedValueOnce([plantingData]);
    const result = await plantingsService.getAllPlantings();
    expect(result).toMatchObject([plantingData]);
  });
  it("Plantings not found", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantings")
      .mockResolvedValueOnce([]);
    try {
      await plantingsService.getAllPlantings();
    } catch (error) {
      expect(error).toMatchObject({
        message: "Plantings not found",
        status: 400,
      });
    }
  });
  it("Read All Plantings of a User", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantingsOfAUser")
      .mockResolvedValueOnce([plantingData]);
    const result = await plantingsService.getllPlantingsOfAUser(1);
    expect(result).toMatchObject([plantingData]);
  });
  it("Plantings or farm not found", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantingsOfAUser")
      .mockResolvedValueOnce([]);
    try {
      await plantingsService.getllPlantingsOfAUser(0);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not found or there are no plantations",
        status: 400,
      });
    }
  });
  it("Create a planting", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValue([{ id: 1 }]);
    jest
      .spyOn(plantingsRepository, "insertPlanting")
      .mockResolvedValueOnce([1]);
    const result = await plantingsService.postPlanting(plantingData);
    expect(result).toMatchObject({ ...plantingData, id: 1 });
  });
});
