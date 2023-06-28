import {
  forecastWeatherApi,
  forecastProWeatherApi,
  defaultParameters,
} from ".";
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

export const get4DaysHourlyForecast = async (
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

export const getUpTo16DaysForecast = async (
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

export const getUpTo30DaysForecast = async (
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
