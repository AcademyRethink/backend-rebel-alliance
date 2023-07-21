import { Router } from "express";
import plotController from "../controllers/plotsController";
import middleware from "../middlewares/plotsDataValidator";
import { tokenValidator } from "../middlewares/tokenValidator";

const router: Router = Router();

router.get(
  "/farm/:id",
  tokenValidator,
  middleware.idValidator,
  plotController.index
);
router.get(
  "/planting/farm/:id",
  tokenValidator,
  middleware.idValidator,
  plotController.indexWithPlatingData
);
router.post(
  "/",
  tokenValidator,
  middleware.plotDataValidator,
  plotController.insert
);
router.put(
  "/:id",
  middleware.idValidator,
  middleware.plotDataValidator,
  plotController.update
);
router.delete(
  "/:id",
  tokenValidator,
  middleware.idValidator,
  plotController.remove
);

export { router };
