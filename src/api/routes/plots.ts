import { Router } from "express";
import plotController from "../controllers/plotsController";
import middleware from "../middlewares/plotsDataValidator";

const router: Router = Router();

router.get("/farm/:id", middleware.idValidator, plotController.index);
router.post("/", middleware.plotDataValidator, plotController.insert);
router.put(
  "/:id",
  middleware.idValidator,
  middleware.plotDataValidator,
  plotController.update
);
router.delete("/:id", middleware.idValidator, plotController.remove);

export { router };
