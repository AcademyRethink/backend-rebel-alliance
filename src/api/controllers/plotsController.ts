import { NextFunction, Request, Response } from "express";
import { PlotWithFarmName, PlotWhithIDsOfFKs } from "../../types/plotTypes";
import plotService from "../services/plotsService";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const farm_id: number = parseInt(req.params.id);
    const allPlotsOnFarm: PlotWhithIDsOfFKs[] =
      await plotService.getPlotsInFarm(farm_id);
    res.status(200).send(allPlotsOnFarm);
  } catch (error) {
    next(error);
  }
};

const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, farm } = req.body;
    const plot: PlotWithFarmName = { name, farm };
    const newPlot: PlotWhithIDsOfFKs = await plotService.postPlot(plot);
    res.status(200).send(newPlot);
  } catch (error) {
    next(error);
  }
};

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const plot: PlotWithFarmName = req.body;
    const updatedPlot: PlotWhithIDsOfFKs = await plotService.updatePlot(
      id,
      plot
    );
    res.status(200).send(updatedPlot);
  } catch (error) {
    next(error);
  }
};

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedPlot: PlotWhithIDsOfFKs = await plotService.deletePlot(id);
    res.status(200).send({
      message: "The following Plot was deleted with success",
      plot: deletedPlot,
    });
  } catch (error) {
    next(error);
  }
};

export default { index, insert, update, remove };
