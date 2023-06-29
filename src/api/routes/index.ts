import { Router } from "express";
import { harvestRouter } from "./harvestRoutes";
import { router as plotRoutes } from "./plots";

const router: Router = Router();

router.use("/harvests", harvestRouter);
router.use("/plots", plotRoutes);

export { router };
