import { Router } from "express";
import plantingsController from "../controllers/plantingsController";
import middleware from "../middlewares/plantingsDataValidator";

const router: Router = Router();

router.get("/", plantingsController.index);
router.get(
  "/user/:id",
  middleware.plantingPathValidator,
  plantingsController.show
);
router.post("/", middleware.plantingsDataValidator, plantingsController.insert);
router.put(
  "/:id",
  middleware.plantingPathValidator,
  middleware.plantingsDataValidator,
  plantingsController.update
);
router.delete(
  "/:id",
  middleware.plantingPathValidator,
  plantingsController.remove
);

export { router };
