import { Router } from "express";
import plotController from "../controllers/plotsController";
import middleware from "../middlewares/plotsDataValidator";

const router: Router = Router();

router.get("/farm/:id", middleware.idValidator, plotController.index);
router.get(
  "/planting/farm/:id",
  middleware.idValidator,
  plotController.indexWithPlatingData
);
router.get(
  "/:id/farm/:farm_id",
  middleware.showIdsValidator,
  plotController.showWithPlatingData
);
router.post("/", middleware.plotDataValidator, plotController.insert);
router.put(
  "/:id",
  middleware.idValidator,
  middleware.plotDataValidator,
  plotController.update
);
router.delete("/:id", middleware.idValidator, plotController.remove);

export { router };
