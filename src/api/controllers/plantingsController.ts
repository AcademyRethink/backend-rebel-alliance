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
  } catch (error) {
    next(error);
  }
};

const show = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const plantings: PlantingsWithNames[] =
      await plantingsService.getllPlantingsOfAUser(id);
    res.status(200).send(plantings);
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
    res.send("Plantio Cadastrada");
  } catch (error) {
    next(error);
  }
};

export default { index, show, insert };
