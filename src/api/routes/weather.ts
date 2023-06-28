import { Router } from "express";
import weatherController from "../controllers/weatherController";

const router = Router();

router.use("/current", weatherController.getCurrentWeather);
router.use("/hourly", weatherController.getHourlyForecast);
router.use("/daily", weatherController.getDailyForecast);
router.use("/month", weatherController.getMonthForecast);

export default router;
