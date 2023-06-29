import { QueryType } from "../../types/queryType";
import { makeError } from "../middlewares/errorHandler";
import weatherApi from "../weatherApi";

const current = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType
) => {
  const response = await weatherApi.getCurrentWeather(city, state, country);
  return response;
};

const hourlyForecast = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType,
  hours?: QueryType
) => {
  const hoursParam = hours ? parseInt(hours as string) : 0;
  if (hoursParam > 96)
    throw makeError({ message: "Hours must be in 1 - 96 interval", status: 400 });

  const response = await weatherApi.get4DaysHourlyForecast(
    city,
    state,
    country,
    hours
  );
  return response;
};

const upTo16DaysForecast = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType,
  days?: QueryType
) => {
  const daysParam = days ? parseInt(days as string) : 0;
  if (daysParam > 16)
    throw makeError({ message: "Days must be in 1 - 16 interval", status: 400 });

  const response = await weatherApi.getUpTo16DaysForecast(
    city,
    state,
    country,
    days
  );
  return response;
};

const upTo30DaysForecast = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType,
  days?: QueryType
) => {
  const daysParam = days ? parseInt(days as string) : 0;
  if (daysParam > 30)
    throw makeError({ message: "Days must be in 1 - 16 interval", status: 400 });

  const response = await weatherApi.getUpTo30DaysForecast(
    city,
    state,
    country,
    days
  );
  return response;
};

export default {
  current,
  hourlyForecast,
  upTo16DaysForecast,
  upTo30DaysForecast,
};
