import {
  currentWeatherApi,
  forecastWeatherApi,
  forecastProWeatherApi,
  defaultParameters,
} from "./apiConnection";
import { QueryType } from "../../types/queryType";

const makeLocale = (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType
) => {
  return countryName
    ? `${cityName}, ${stateName}, ${countryName}`
    : stateName
    ? `${cityName}, ${stateName}`
    : cityName;
};

const getCurrentWeather = async (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType
) => {
  const locale = makeLocale(cityName, stateName, countryName);

  const response = await currentWeatherApi.get(
    `?q=${locale}&${defaultParameters}`
  );
  return response.data;
};

const get4DaysHourlyForecast = async (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType,
  numberOfHours: QueryType = "24" // 1 - 16
) => {
  const locale = makeLocale(cityName, stateName, countryName);

  const response = await forecastProWeatherApi.get(
    `/hourly?q=${locale}&${defaultParameters}&cnt=${numberOfHours}`
  );
  return response.data;
};

const getUpTo16DaysForecast = async (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType,
  numberOfDays: QueryType = "7" // 1 - 16
) => {
  const locale = makeLocale(cityName, stateName, countryName);

  const response = await forecastWeatherApi.get(
    `/daily?q=${locale}&${defaultParameters}&cnt=${numberOfDays}`
  );
  return response.data;
};

const getUpTo30DaysForecast = async (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType,
  numberOfDays: QueryType = "7" // 1 - 16
) => {
  const locale = makeLocale(cityName, stateName, countryName);

  const response = await forecastProWeatherApi.get(
    `/climate?q=${locale}&${defaultParameters}&cnt=${numberOfDays}`
  );
  return response.data;
};

export default {
  getCurrentWeather,
  get4DaysHourlyForecast,
  getUpTo16DaysForecast,
  getUpTo30DaysForecast,
};
