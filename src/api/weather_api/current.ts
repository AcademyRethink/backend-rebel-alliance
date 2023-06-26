import { currentWeatherApi, defaultParameters } from ".";
import { QueryType } from "../../types/queryType";

export const getCurrentWeather = async (
  cityName: QueryType,
  stateName?: QueryType,
  countryName?: QueryType
) => {
  const locale = countryName
    ? `${cityName}, ${stateName}, ${countryName}`
    : stateName
    ? `${cityName}, ${stateName}`
    : cityName;

  const response = await currentWeatherApi.get(`?q=${locale}&${defaultParameters}`);
  return response.data;
};
