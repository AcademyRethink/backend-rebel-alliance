import { Router } from "express";
import harvestController from "../controllers/harvestController";
import dataValidator from "../middlewares/harvestsDataValidator";

const harvestRouter: Router = Router();

harvestRouter.post(
  "/",
  dataValidator.harvestDataValidator,
  harvestController.insert
);

harvestRouter.get("/farm/:farmid", harvestController.index);

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

harvestRouter.get("/planting/:id", harvestController.showByPlating);

harvestRouter.patch(
  "/:harvestid",
  dataValidator.harvestPatchDataValidator,
  harvestController.updateHarvestOfTheFarm
);

harvestRouter.delete("/:harvestid", harvestController.deleteHarvest);

export { harvestRouter };
