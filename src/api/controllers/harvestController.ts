import { NextFunction, Request, Response } from "express";
import harvestService from "../services/harvestService";

const insert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const harvestData = req.body;
    const newHarvest = await harvestService.registerNewHarvest(harvestData);
    res.status(200).json(newHarvest);
  } catch (error: unknown) {
    next(error);
  }
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.farmid);
    const harvests = await harvestService.getAllHarvestsOfTheFarm(id);
    res.status(200).json(harvests);
  } catch (error: unknown) {
    next(error);
  }
};

const getHarvestsOfTheFarmByPlotId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const farID = parseInt(req.params.farmid);
    const plotID = parseInt(req.params.plotid);

    const harvests = await harvestService.getHarvestsOfTheFarmByPlotId(
      farID,
      plotID
    );

    res.status(200).json(harvests);
  } catch (error: unknown) {
    next(error);
  }
};
const getHarvestsOfTheFarmByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const farID = parseInt(req.params.farmid);
    const harvestDate = req.params.harvestdate;

    const harvests = await harvestService.getHarvestsOfTheFarmByDate(
      farID,
      harvestDate
    );

    res.status(200).json(harvests);
  } catch (error: unknown) {
    next(error);
  }
};

export default {
  insert,
  index,
  getHarvestsOfTheFarmByPlotId,
  getHarvestsOfTheFarmByDate,
};
