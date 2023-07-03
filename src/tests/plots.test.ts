import { describe, expect, it, jest } from "@jest/globals";
import plotRepository from "../api/repositories/plotRepository";
import { allFarms, allPlots, farm, plot } from "./mockPlots";
import plotService from "../api/services/plotsService";
import farmRepository from "../api/repositories/farmRepository";

describe("Get all plots of the farm", () => {
  it("Should return all plots of the informated farm", async () => {
    jest.spyOn(farmRepository, "selectByIdWithoutJoin").mockResolvedValue(farm);
    jest
      .spyOn(plotRepository, "selectPlotsByFarmId")
      .mockResolvedValue(allPlots);

    expect(await plotService.getPlotsInFarm(1)).toMatchObject([plot]);
  });

  it("Should throw an error if the informated farm does not exist", async () => {
    jest
      .spyOn(farmRepository, "selectByIdWithoutJoin")
      .mockResolvedValue(allFarms[1]);
    jest.spyOn(plotRepository, "selectPlotsByFarmId").mockResolvedValue([plot]);

    try {
      await plotService.getPlotsInFarm(5);
    } catch (error) {
      expect(error).toMatchObject({ message: "The farm does not exist!" });
    }
  });
});

describe("Insert a new plot on farm", () => {
  it("Should return the inserted plot", async () => {
    jest
      .spyOn(plotRepository, "selectByNameWhithoutJoin")
      .mockResolvedValue(allPlots[1]);
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValue(farm);

    jest.spyOn(plotRepository, "insertPlot").mockResolvedValue(plot);

    expect(
      await plotService.postPlot({ name: "plotName", farm: "farmName" })
    ).toMatchObject(plot);
  });

  it("Should throw an error if the plot already exists", async () => {
    jest
      .spyOn(plotRepository, "selectByNameWhithoutJoin")
      .mockResolvedValue(allPlots[0]);
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValue(farm);

    jest.spyOn(plotRepository, "insertPlot").mockResolvedValue(plot);

    try {
      await plotService.postPlot({ name: "plotName", farm: "farmName" });
    } catch (error) {
      expect(error).toMatchObject({ message: "The plot already exists!" });
    }
  });

  it("Should throw an error if the farm does not exist", async () => {
    jest
      .spyOn(plotRepository, "selectByNameWhithoutJoin")
      .mockResolvedValue(allPlots[1]);
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValue(allFarms[1]);

    jest.spyOn(plotRepository, "insertPlot").mockResolvedValue(plot);

    try {
      await plotService.postPlot({ name: "plotName", farm: "farmName" });
    } catch (error) {
      expect(error).toMatchObject({ message: "The farm doesn't exist!" });
    }
  });
});

describe("Update a plot on farm", () => {
  it("Should return the updated plot", async () => {
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValue(farm);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValue(allPlots[0]);

    jest.spyOn(plotRepository, "updatePlot").mockResolvedValue(plot);

    expect(
      await plotService.updatePlot(1, { name: "plotName", farm: "farmName" })
    ).toMatchObject(plot);
  });

  it("Should throw an error if the farm does not exist", async () => {
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValue(allFarms[1]);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValue(allPlots[0]);

    jest.spyOn(plotRepository, "updatePlot").mockResolvedValue(plot);

    try {
      await plotService.updatePlot(1, { name: "plotName", farm: "farmName" });
    } catch (error) {
      expect(error).toMatchObject({ message: "The farm does not exist!" });
    }
  });

  it("Should throw an error if the plot does not exist or does not belong to the farm", async () => {
    jest
      .spyOn(farmRepository, "selectByNameWhithoutJoin")
      .mockResolvedValue(farm);
    jest
      .spyOn(plotRepository, "selectPlotByIdAndFarmId")
      .mockResolvedValue(allPlots[1]);

    jest.spyOn(plotRepository, "updatePlot").mockResolvedValue(plot);

    try {
      await plotService.updatePlot(1, { name: "plotName", farm: "farmName" });
    } catch (error) {
      expect(error).toMatchObject({
        message:
          "The plot does not exist or does not belong to the indicated farm!",
      });
    }
  });
});

describe("Delete a plot of the farm", () => {
  it("Should return the deleted plot of the farm", async () => {
    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValue(plot);

    jest.spyOn(plotRepository, "deletePlot").mockResolvedValue(plot);

    expect(await plotService.deletePlot(1)).toMatchObject(plot);
  });

  it("Should throw an error if the informated plot id does not exist", async () => {
    jest
      .spyOn(plotRepository, "selectByIdWhithoutJoin")
      .mockResolvedValue(allPlots[1]);

    jest.spyOn(plotRepository, "deletePlot").mockResolvedValue(plot);

    try {
      await plotService.deletePlot(1);
    } catch (error) {
      expect(error).toMatchObject({ message: "The plot does not exist!" });
    }
  });
});
