import { Router } from "express";
import plantingsController from "../controllers/plantingsController";

const router: Router = Router();

router.get("/", plantingsController.index);
router.get("/:id", plantingsController.show);
router.post("/", plantingsController.insert);

export { router };
