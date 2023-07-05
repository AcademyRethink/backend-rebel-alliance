import { Router } from "express";
import weatherController from "../controllers/weatherController";
import middleware from "../middlewares/weatherQueryValidator";

const router: Router = Router();

router.get(
  "/current",
  middleware.weatherCityQueryValidator,
  weatherController.getCurrentWeather
);
router.get(
  "/hourly",
  middleware.weatherCityQueryValidator,
  weatherController.getHourlyForecast
);
router.get(
  "/daily",
  middleware.weatherCityQueryValidator,
  weatherController.getDailyForecast
);
router.get(
  "/month",
  middleware.weatherCityQueryValidator,
  weatherController.getMonthForecast
);

export { router };
