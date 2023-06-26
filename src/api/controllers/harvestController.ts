import { NextFunction, Request, Response } from "express";
import harvestService from "../services/harvestService";

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.farmid);
    const products = await harvestService.getAllPlotsOfTheFarm(id);
    res.status(200).json(products);
  } catch (error: unknown) {
    next(error);
  }
};

export default { index };
