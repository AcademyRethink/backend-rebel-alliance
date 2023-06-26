import { Router, Request, Response } from "express";
import { getCurrentWeather } from "../weather_api/current";

const router = Router();

const currentWeather = async (req: Request, res: Response) => {
  const query = req.query;
  const response = await getCurrentWeather(query.city);
  res.send(response);
};

router.use("/", currentWeather);

export default router;
