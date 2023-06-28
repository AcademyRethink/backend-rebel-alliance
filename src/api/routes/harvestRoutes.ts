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
  "/farm/:farmid/date/:harvestdate",
  harvestController.getHarvestsOfTheFarmByDate
);

harvestRouter.get(
  "/farm/:farmid/plot/:plotid/date/:harvestdate",
  harvestController.getHarvestOfTheFarmByDateAndPlot
);

harvestRouter.patch("/:harvestid", harvestController.updateHarvestOfTheFarm);

harvestRouter.delete("/:harvestid");

export { harvestRouter };
