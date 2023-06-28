import { Request, Response, NextFunction } from "express";
import weathterService from "../services/weatherService";

const getCurrentWeather = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { city, state, country } = req.query;
    const response = await weathterService.current(city, state, country);
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const getHourlyForecast = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { city, state, country, hours } = req.query;
    const response = await weathterService.hourlyForecast(
      city,
      state,
      country,
      hours
    );
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const getDailyForecast = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { city, state, country, days } = req.query;
    const response = await weathterService.upTo16DaysForecast(
      city,
      state,
      country,
      days
    );
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const getMonthForecast = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { city, state, country, days } = req.query;
    const response = await weathterService.upTo30DaysForecast(
      city,
      state,
      country,
      days
    );
    res.send(response);
  } catch (error) {
    next(error);
  }
};

export default {
  getCurrentWeather,
  getHourlyForecast,
  getDailyForecast,
  getMonthForecast,
};
