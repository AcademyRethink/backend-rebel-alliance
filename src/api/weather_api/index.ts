import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();

// Api doc -> https://openweathermap.org/api

const parameters = {
  units: "metric",
  lang: "pt_br",
  appid: process.env.WEATHER_API_KEY,
};

export const defaultParameters = `appid=${parameters.appid}&units=${parameters.units}&lang=${parameters.lang}`;

export const currentWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
});

export const forecastWeatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/forecast/",
});

export const forecastProWeatherApi = axios.create({
  baseURL: "https://pro.openweathermap.org/data/2.5/forecast",
});
