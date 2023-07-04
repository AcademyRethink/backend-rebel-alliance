import { Router } from "express";
import { router as weatherRoutes } from "./weather";
import { router as plantingRoutes } from "./plantings";
import { harvestRouter } from "./harvestRoutes";

const router: Router = Router();

router.use("/weather", weatherRoutes);
router.use("/harvests", harvestRouter);
router.use("/plantings", plantingRoutes);

export { router };
