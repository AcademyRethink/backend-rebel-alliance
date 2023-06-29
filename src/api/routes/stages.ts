import { Router } from "express";
import stagesController from "../controllers/stagesController";
import middleware from "../middlewares/stagesDataValidator";

const router: Router = Router();

router.get("/", stagesController.index);
router.get(
  "/:id",
  middleware.stagesPathValidatorByCulture,
  stagesController.show
);

export { router };
