import { Router } from "express";
import weatherController from "../controllers/weatherController";
import middleware from "../middlewares/weatherQueryValidator";

const router: Router = Router();

router.use(
  "/current",
  middleware.weatherCityQueryValidator,
  weatherController.getCurrentWeather
);
router.use(
  "/hourly",
  middleware.weatherCityQueryValidator,
  weatherController.getHourlyForecast
);
router.use(
  "/daily",
  middleware.weatherCityQueryValidator,
  weatherController.getDailyForecast
);
router.use(
  "/month",
  middleware.weatherCityQueryValidator,
  weatherController.getMonthForecast
);

export { router };
