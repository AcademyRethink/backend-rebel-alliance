import { FarmWhithIDsOfFKs, PlotWhithIDsOfFKs } from "../types";

export const plot: PlotWhithIDsOfFKs = {
  id: 5,
  name: "Rio do Café",
  farm_id: 2,
};

export const plotWitPlating = {
  farm_id: 1,
  plot_id: 1,
  plot_name: "Plot",
  planting_id: 1,
  planting_date: "2023-06-26T03:00:00.000Z",
  saplings: 40,
  stage: "Florada",
  harvests: "2",
};

export const farm: FarmWhithIDsOfFKs = {
  id: 2,
  cnpj: "11111111111111",
  name: "Fazenda Teste",
  phone: "3030303030",
  address_id: 2,
};

export const allPlots: PlotWhithIDsOfFKs[] = [plot];
