import { Router } from "express";
import { harvestRouter } from "./harvestRoutes";
import { userRoutes } from "./userRoutes";
import { farmRoutes } from "./farmRoutes";
import { addressRoutes } from "./addressRoutes";

const router: Router = Router();

router.use("/harvests", harvestRouter);
router.use("/user", userRoutes);
router.use("/farm", farmRoutes);
router.use("/address", addressRoutes);

export { router };
