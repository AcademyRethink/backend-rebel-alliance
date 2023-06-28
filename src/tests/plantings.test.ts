import plantingsService from "../api/services/plantingsService";
import plantingsRepository from "../api/repositories/plantingsRepository";
import { describe, expect, jest } from "@jest/globals";
import { plantingData } from "./mockPlantings";
import { PlantingsWithNames } from "../types/plantingTypes";

describe("Plantings Tests", () => {
  it("Read All Plantings", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantings")
      .mockResolvedValueOnce([plantingData]);
    const result: PlantingsWithNames[] =
      await plantingsService.getAllPlantings();
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
    const result: PlantingsWithNames[] =
      await plantingsService.getllPlantingsOfAUser(1);
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
    const result: string = await plantingsService.postPlanting(plantingData);
    expect(result).toBe("Registered planting");
  });
  it("Some ID can not found - Create Planting", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValue([]);
    try {
      await plantingsService.postPlanting(plantingData);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Some ID can not found",
        status: 400,
      });
    }
  });
  it("Update a planting", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValue([{ id: 1 }]);
    jest.spyOn(plantingsRepository, "updatePlanting").mockResolvedValueOnce(1);
    const result: string = await plantingsService.updatePlanting(
      1,
      plantingData
    );
    expect(result).toBe("Planting has been updated");
  });
  it("Some ID can not found - Update Planting", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValue([]);
    try {
      await plantingsService.updatePlanting(1, plantingData);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Some ID can not found",
        status: 400,
      });
    }
  });
  it("Delete a planting", async () => {
    jest.spyOn(plantingsRepository, "deletePlanting").mockResolvedValue(1);
    const result: string = await plantingsService.deletePlanting(1);
    expect(result).toBe("Planting has benn deleted");
  });
  it("Planting not found - Delete Planting", async () => {
    jest.spyOn(plantingsRepository, "deletePlanting").mockResolvedValue(0);
    try {
      await plantingsService.deletePlanting(0);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Planting not found",
        status: 400,
      });
    }
  });
  it("Read All Plantings of a User By Plot", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantingsOfAUserByPlot")
      .mockResolvedValueOnce([plantingData]);
    const result: PlantingsWithNames[] =
      await plantingsService.getAllPlantingsOfAUserByPlot(1, 1);
    expect(result).toMatchObject([plantingData]);
  });
  it("Farm not found or there are no plantations - Plantings of a User By Plot", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantingsOfAUserByPlot")
      .mockResolvedValueOnce([]);
    try {
      await plantingsService.getAllPlantingsOfAUserByPlot(10, 10);
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not found or there are no plantations",
        status: 400,
      });
    }
  });
  it("Read All Plantings of a User By Date", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantingsOfAUserByDate")
      .mockResolvedValueOnce([plantingData]);
    const result: PlantingsWithNames[] =
      await plantingsService.getAllPlantingsOfAUserByDate(1, "2023-06-26");
    expect(result).toMatchObject([plantingData]);
  });
  it("Farm not found or there are no plantations - Plantings of a User By Date", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantingsOfAUserByDate")
      .mockResolvedValueOnce([]);
    try {
      await plantingsService.getAllPlantingsOfAUserByDate(10, "2023-10-26");
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not found or there are no plantations",
        status: 400,
      });
    }
  });
  it("Read All Plantings of a User By Plot and by date", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantingsOfAUserByPlotAndByDate")
      .mockResolvedValueOnce([plantingData]);
    const result: PlantingsWithNames[] =
      await plantingsService.getAllPlantingsOfAUserByPlotAndByDate(
        1,
        1,
        "2023-06-26"
      );
    expect(result).toMatchObject([plantingData]);
  });
  it("Farm not found or there are no plantations - Plantings of a User By Plot and by date", async () => {
    jest
      .spyOn(plantingsRepository, "selectAllPlantingsOfAUserByPlotAndByDate")
      .mockResolvedValueOnce([]);
    try {
      await plantingsService.getAllPlantingsOfAUserByPlotAndByDate(
        10,
        10,
        "2023-10-26"
      );
    } catch (error) {
      expect(error).toMatchObject({
        message: "Farm not found or there are no plantations",
        status: 400,
      });
    }
  });
  it("Select Id", async () => {
    jest
      .spyOn(plantingsRepository, "selectId")
      .mockResolvedValueOnce([{ id: 1 }]);
    const result: number | null = await plantingsService.selectId(
      "plot",
      "name",
      "plot"
    );
    expect(result).toBe(1);
  });
  it("Return NULL - Select Id", async () => {
    jest.spyOn(plantingsRepository, "selectId").mockResolvedValueOnce([]);
    try {
      await plantingsService.selectId("plots", "names", "plots");
    } catch (error) {
      expect(error).toBe(null);
    }
  });
});
