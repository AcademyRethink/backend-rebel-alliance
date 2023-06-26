import { NextFunction, Request, Response } from "express";
import plantingsRepositorie from "../repositories/plantingsRepositorie";
import { PlantingsWitNames } from "../../types/plantingTypes";

const index = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const plantings: PlantingsWitNames[] =
      await plantingsRepositorie.selectAllPlantings();
    res.status(200).send(plantings);
  } catch (error) {
    next(error);
  }
};

export default { index };
