import { Router } from "express";
import plantingsController from "../controllers/plantingsController";

const router: Router = Router();

router.get("/", plantingsController.index);

export { router };
