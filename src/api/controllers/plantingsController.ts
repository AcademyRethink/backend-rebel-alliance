import { NextFunction, Request, Response } from "express";
import plantingsService from "../services/plantingsService";
import { PlantingsWitNames } from "../../types/plantingTypes";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plantings: PlantingsWitNames[] =
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
    const plantings: PlantingsWitNames[] =
      await plantingsService.getllPlantingsOfAUser(id);
    res.status(200).send(plantings);
  } catch (error) {
    next(error);
  }
};

export default { index, show };
