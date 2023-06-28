import { QueryType } from "../../types/queryType";
import { getCurrentWeather } from "../weather_api/current";
import {
  get4DaysHourlyForecast,
  getUpTo16DaysForecast,
  getUpTo30DaysForecast,
} from "../weather_api/forecast";

const current = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType
) => {
  const response = await getCurrentWeather(city, state, country);
  return response;
};

const hourlyForecast = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType,
  hours?: QueryType
) => {
  const response = await get4DaysHourlyForecast(city, state, country, hours);
  return response;
};

const upTo16DaysForecast = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType,
  days?: QueryType
) => {
  const response = await getUpTo16DaysForecast(city, state, country, days);
  return response;
};

const upTo30DaysForecast = async (
  city: QueryType,
  state?: QueryType,
  country?: QueryType,
  days?: QueryType
) => {
  const response = await getUpTo30DaysForecast(city, state, country, days);
  return response;
};

export default {
  current,
  hourlyForecast,
  upTo16DaysForecast,
  upTo30DaysForecast,
};
