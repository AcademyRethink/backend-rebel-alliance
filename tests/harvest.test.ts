import { describe, expect, jest } from "@jest/globals";
import harvestService from "../src/api/services/harvestService";
import harvestRepository from "../src/api/repositories/harvestRepository";
import plotRepository from "../src/api/repositories/plotRepository";
import userRepository from "../src/api/repositories/userRepository";
import farmRepository from "../src/api/repositories/farmRepository";
import {
  mockedPlotWhithIds,
  mockedFarmWhithIds,
  mockedHarvestWithIds,
  mockedHarvestWithNames,
  mockedUserWhithIds,
} from "./harvestMock";

describe("Harvest Services Tests - registerNewHarvest Function", () => {
  it("Resgister a harvest", async () => {
    jest
      .spyOn(plotRepository, "selectByNameWhithoutJoin")
      .mockResolvedValueOnce(mockedPlotWhithIds);
    jest
      .spyOn(userRepository, "selectByNameWithoutJoin")
      .mockResolvedValueOnce(mockedUserWhithIds);
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);
    jest
      .spyOn(harvestRepository, "insert")
      .mockResolvedValueOnce(mockedHarvestWithIds);

    const result = await harvestService.registerNewHarvest({
      date: new Date("2023-06-28T03:00:00.000Z"),
      bags: 40,
      plot_name: "Baixada Mineria",
      user_name: "Jose",
      farm_name: "Fazenda Rebel Alliance",
    });

    expect(result).toMatchObject(mockedHarvestWithIds);
  });
  it("Resgister fail because plot does not exist", async () => {
    jest
      .spyOn(plotRepository, "selectByNameWhithoutJoin")
      .mockResolvedValueOnce(undefined);
    jest
      .spyOn(userRepository, "selectByNameWithoutJoin")
      .mockResolvedValueOnce(mockedUserWhithIds);
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);
    jest
      .spyOn(harvestRepository, "insert")
      .mockResolvedValueOnce(mockedHarvestWithIds);

    try {
      await harvestService.registerNewHarvest({
        date: new Date("2023-06-28T03:00:00.000Z"),
        bags: 40,
        plot_name: "Baixada Mineria",
        user_name: "Jose",
        farm_name: "Fazenda Rebel Alliance",
      });
    } catch (error) {
      expect(error).toMatchObject({ message: "Plot Not Found", status: 400 });
    }
  });

  it("Resgister fail because user does not exist", async () => {
    jest
      .spyOn(plotRepository, "selectByNameWhithoutJoin")
      .mockResolvedValueOnce(mockedPlotWhithIds);
    jest
      .spyOn(userRepository, "selectByNameWithoutJoin")
      .mockResolvedValueOnce(undefined);
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);
    jest
      .spyOn(harvestRepository, "insert")
      .mockResolvedValueOnce(mockedHarvestWithIds);

    try {
      await harvestService.registerNewHarvest({
        date: new Date("2023-06-28T03:00:00.000Z"),
        bags: 40,
        plot_name: "Baixada Mineria",
        user_name: "Jose",
        farm_name: "Fazenda Rebel Alliance",
      });
    } catch (error) {
      expect(error).toMatchObject({ message: "User Not Found", status: 400 });
    }
  });

  it("Resgister fail because Farm does not exist", async () => {
    jest
      .spyOn(plotRepository, "selectByNameWhithoutJoin")
      .mockResolvedValueOnce(mockedPlotWhithIds);
    jest
      .spyOn(userRepository, "selectByNameWithoutJoin")
      .mockResolvedValueOnce(mockedUserWhithIds);
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValueOnce(undefined);
    jest
      .spyOn(harvestRepository, "insert")
      .mockResolvedValueOnce(mockedHarvestWithIds);

    try {
      await harvestService.registerNewHarvest({
        date: new Date("2023-06-28T03:00:00.000Z"),
        bags: 40,
        plot_name: "Baixada Mineria",
        user_name: "Jose",
        farm_name: "Fazenda Rebel Alliance",
      });
    } catch (error) {
      expect(error).toMatchObject({ message: "Farm Not Found", status: 400 });
    }
  });
});

describe("Harvest Services Tests - getHarvestsOfTheFarm Functions", () => {
  it("Return all Harvests os teh farm", async () => {
    jest
      .spyOn(harvestRepository, "selectAllOfTheFarmWithJoin")
      .mockResolvedValueOnce([mockedHarvestWithNames]);

    const result = await harvestService.getAllHarvestsOfTheFarm(1);

    expect(result).toMatchObject([mockedHarvestWithNames]);
  });

  it("Farm does not have harvests", async () => {
    jest
      .spyOn(harvestRepository, "selectAllOfTheFarmWithJoin")
      .mockResolvedValueOnce([]);

    const result = await harvestService.getAllHarvestsOfTheFarm(1);

    expect(result).toMatchObject([]);
  });

  it("Get Harvests of the farm by plot id", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);

    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValueOnce(mockedPlotWhithIds);
    jest
      .spyOn(harvestRepository, "selectFromFarmByPlotIdWithJoin")
      .mockResolvedValueOnce([mockedHarvestWithNames]);

    const result = await harvestService.getHarvestsOfTheFarmByPlotId(1, 1);

    expect(result).toMatchObject([mockedHarvestWithNames]);
  });

  it("Get Harvests of the farm by harvest date", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);

    jest
      .spyOn(harvestRepository, "selectFromFarmByDateWithJoin")
      .mockResolvedValueOnce([mockedHarvestWithNames]);

    const result = await harvestService.getHarvestsOfTheFarmByDate(
      1,
      "2023-06-28"
    );

    expect(result).toMatchObject([mockedHarvestWithNames]);
  });

  it("Get Harvests of the farm by plot and harvest date", async () => {
    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValueOnce(mockedPlotWhithIds);

    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);

    jest
      .spyOn(harvestRepository, "selectFromFarmByDateAndPlotWithJoin")
      .mockResolvedValueOnce([mockedFarmWhithIds]);

    const result = await harvestService.getHarvestOfTheFarmByDateAndPlot(
      1,
      1,
      "2023-06-28"
    );

    expect(result).toMatchObject([mockedFarmWhithIds]);
  });

  it("Error test, farm does not exist", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValueOnce(undefined);

    try {
      await harvestService.getHarvestsOfTheFarmByPlotId(1, 1);
    } catch (error) {
      expect(error).toMatchObject({ message: "Farm Not Found", status: 400 });
      jest.clearAllMocks();
    }
  });

  it("Error test, plot does not exist", async () => {
    try {
      jest.clearAllMocks();

      jest
        .spyOn(farmRepository, "selectByIdWithoutJoin")
        .mockResolvedValueOnce(mockedFarmWhithIds);
      jest
        .spyOn(plotRepository, "selectByIdWhithoutJoin")
        .mockResolvedValueOnce(undefined);

      await harvestService.getHarvestsOfTheFarmByPlotId(1, 7);
    } catch (error) {
      expect(error).toMatchObject({ message: "Plot Not Found", status: 400 });
    }

    // try {
    //   await harvestService.getHarvestsOfTheFarmByPlotId(1, 1);
    // } catch (error) {

    //
    // }
  });
});
