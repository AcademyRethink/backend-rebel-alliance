import { NextFunction, Request, Response } from "express";
import plantingsService from "../services/plantingsService";
import { PlantingsWithNames } from "../../types/plantingTypes";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plantings: PlantingsWithNames[] =
      await plantingsService.getAllPlantings();
    res.status(200).send(plantings);
  } catch (error: unknown) {
    next(error);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const farmId: number = parseInt(req.params.farmId);
    const plantings: PlantingsWithNames[] =
      await plantingsService.getllPlantingsOfAUser(farmId);
    res.status(200).send(plantings);
  } catch (error: unknown) {
    next(error);
  }
};

const insert = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { date, saplings, plot, stage, user, farm }: PlantingsWithNames =
      req.body;
    const planting: PlantingsWithNames = {
      date,
      saplings,
      plot,
      stage,
      user,
      farm,
    };
    await plantingsService.postPlanting(planting);
    res.send("Registered planting");
  } catch (error: unknown) {
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
    const { date, saplings, plot, stage, user, farm }: PlantingsWithNames =
      req.body;
    const planting: PlantingsWithNames = {
      date,
      saplings,
      plot,
      stage,
      user,
      farm,
    };
    await plantingsService.updatePlanting(id, planting);
    res.send("Planting has been updated");
  } catch (error: unknown) {
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
    await plantingsService.deletePlanting(id);
    res.send("Planting has benn deleted");
  } catch (error: unknown) {
    next(error);
  }
};

const showByPlot = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const farmId: number = parseInt(req.params.farmId);
    const plotId: number = parseInt(req.params.plotId);

    const plantings: PlantingsWithNames[] =
      await plantingsService.getllPlantingsOfAUserByPlot(farmId, plotId);
    res.status(200).send(plantings);
  } catch (error: unknown) {
    next(error);
  }
};

const showByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const farmId: number = parseInt(req.params.farmId);
    const plantingDate: string = req.params.plantingDate;

    const plantings: PlantingsWithNames[] =
      await plantingsService.getllPlantingsOfAUserByDate(farmId, plantingDate);
    res.status(200).send(plantings);
  } catch (error: unknown) {
    next(error);
  }
};

const showByPlotAndDate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const farmId: number = parseInt(req.params.farmId);
    const plotId: number = parseInt(req.params.plotId);
    const plantingDate: string = req.params.plantingDate;

    const plantings: PlantingsWithNames[] =
      await plantingsService.getllPlantingsOfAUserByPlotAndByDate(
        farmId,
        plotId,
        plantingDate
      );
    res.status(200).send(plantings);
  } catch (error: unknown) {
    next(error);
  }
};
export default {
  index,
  show,
  insert,
  update,
  remove,
  showByPlot,
  showByDate,
  showByPlotAndDate,
};
