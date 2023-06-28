import { Router } from "express";
import plantingsController from "../controllers/plantingsController";
import middleware from "../middlewares/plantingsDataValidator";

const router: Router = Router();

router.get("/", plantingsController.index);
router.get(
  "/farm/:farmId",
  middleware.plantingPathValidatorByFarm,
  plantingsController.show
);
router.get(
  "/farm/:farmId/plot/:plotId",
  middleware.plantingPathValidatorByFarm,
  middleware.plantingPathValidatorByPlot,
  plantingsController.showByPlot
);
router.get(
  "/farm/:farmId/date/:plantingDate",
  middleware.plantingPathValidatorByFarm,
  middleware.plantingPathValidatorByDate,
  plantingsController.showByDate
);
router.get(
  "/farm/:farmId/plot/:plotId/date/:plantingDate",
  middleware.plantingPathValidatorByFarm,
  middleware.plantingPathValidatorByPlot,
  middleware.plantingPathValidatorByDate,
  plantingsController.showByPlotAndDate
);

router.post("/", middleware.plantingsDataValidator, plantingsController.insert);
router.put(
  "/:id",
  middleware.plantingPathValidatorByFarm,
  middleware.plantingsDataValidator,
  plantingsController.update
);
router.delete(
  "/:id",
  middleware.plantingPathValidatorByFarm,
  plantingsController.remove
);

export { router };
