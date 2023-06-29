import { router as stagesRoutes } from "./stages";
import { Router } from "express";

const router: Router = Router();

router.use("/stages", stagesRoutes);

export { router };
