import { Router } from "express";
import { harvestRouter } from "./harvestRoutes";

const router: Router = Router();

router.use("/harvests", harvestRouter);

export { router };
