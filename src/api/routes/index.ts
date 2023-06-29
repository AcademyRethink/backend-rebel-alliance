import { router as weatherRoutes } from "./weather";
import { Router } from "express";

const router: Router = Router();

router.use("/weather", weatherRoutes);

export { router };
