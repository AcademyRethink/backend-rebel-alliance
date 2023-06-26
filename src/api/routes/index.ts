import { router as plantingRoutes } from "./plantings";
import { Router } from "express";

const router: Router = Router();

router.use("/plantings", plantingRoutes);

export { router };
