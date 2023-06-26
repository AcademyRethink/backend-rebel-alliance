import { Router } from "express";
import harvestController from "../controllers/harvestController";

const harvestRouter: Router = Router();

harvestRouter.get("/:farmid", harvestController.index);

export { harvestRouter };
