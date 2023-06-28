import { Router } from "express";
import harvestController from "../controllers/harvestController";

const harvestRouter: Router = Router();

harvestRouter.post("/", harvestController.insert);

harvestRouter.get("/:farmid", harvestController.index);

harvestRouter.get(
  "/farm/:farmid/plot/:plotid",
  harvestController.getHarvestsOfTheFarmByPlotId
);

harvestRouter.get(
  "/farm/:farmid/date/:farmdate",
  harvestController.getHarvestsOfTheFarmByDate
);
export { harvestRouter };
