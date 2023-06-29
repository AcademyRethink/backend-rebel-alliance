import { Router } from "express";
import stagesController from "../controllers/stagesController";

const router: Router = Router();

router.get("/", stagesController.index);
router.get("/:id", stagesController.show);

export { router };
