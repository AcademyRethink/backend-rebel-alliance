import { Router } from "express";
import { harvestRouter } from "./harvestRoutes";
import { router as plantingRoutes } from "./plantings";

const router: Router = Router();

router.use("/harvests", harvestRouter);
router.use("/plantings", plantingRoutes);

export { router };
