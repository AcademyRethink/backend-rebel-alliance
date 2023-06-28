import { Request, Response, NextFunction } from "express";
import { string, number, object } from "yup";

const hasTrueStrict: { strict: boolean } = { strict: true };

const plantingPathValidatorByFarm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pathPlanting = parseInt(req.params.farmId);
    const pathPlantingSchema = number().required("Farm id is required");
    await pathPlantingSchema.validate(pathPlanting, hasTrueStrict);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const plantingPathValidatorByPlot = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pathPlantingPlot = parseInt(req.params.plotId);
    const pathPlantingPlotSchema = number().required("Plot id is required");
    await pathPlantingPlotSchema.validate(pathPlantingPlot, hasTrueStrict);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const plantingPathValidatorByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pathPlantingDate = req.params.plantingDate;
    const pathPlantingDateSchema = string().required("Data id required");
    await pathPlantingDateSchema.validate(pathPlantingDate, hasTrueStrict);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const plantingsDataValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const planting = req.body;
    const plantingSchema = object({
      date: string().required("Date is required"),
      saplings: number().required("Saplings is required"),
      plot: string().required("Plot is required"),
      stage: string().required("Stage is required"),
      user: string().required("User is required"),
      farm: string().required("Farm is required"),
    });
    await plantingSchema.validate(planting, hasTrueStrict);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  plantingPathValidatorByFarm,
  plantingsDataValidator,
  plantingPathValidatorByPlot,
  plantingPathValidatorByDate,
};
