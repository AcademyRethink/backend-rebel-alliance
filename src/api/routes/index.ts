import { Router } from "express";
import { router as weatherRoutes } from "./weather";
import { router as plantingRoutes } from "./plantings";
import { harvestRouter } from "./harvestRoutes";
import { router as plotRoutes } from "./plots";
import { router as stagesRoutes } from "./stages";

const router: Router = Router();

router.use("/weather", weatherRoutes);
router.use("/harvests", harvestRouter);
router.use("/plots", plotRoutes);
router.use("/plantings", plantingRoutes);
router.use("/stages", stagesRoutes);

export { router };
