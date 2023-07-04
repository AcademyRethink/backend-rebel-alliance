import { Router } from "express";
import plantingsController from "../controllers/plantingsController";
import middleware from "../middlewares/plantingsDataValidator";

const router: Router = Router();

router.get("/", middleware.plantingQueryValidator, plantingsController.index);
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