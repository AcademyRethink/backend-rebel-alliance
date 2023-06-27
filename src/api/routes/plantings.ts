import { Router } from "express";
import plantingsController from "../controllers/plantingsController";

const router: Router = Router();

router.get("/", plantingsController.index);
router.get("/user/:id", plantingsController.show);
router.post("/", plantingsController.insert);
router.delete("/:id", plantingsController.remove);

export { router };
