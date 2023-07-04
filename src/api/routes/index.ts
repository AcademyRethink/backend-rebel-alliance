import { router as weatherRoutes } from "./weather";
import { router as plantingRoutes } from "./plantings";
import { Router } from "express";

const router: Router = Router();

router.use("/weather", weatherRoutes);
router.use("/plantings", plantingRoutes);

export { router };
