import { FarmWhithIDsOfFKs, PlotWhithIDsOfFKs } from "../types";

export const plot: PlotWhithIDsOfFKs = {
  id: 5,
  name: "Rio do Café",
  farm_id: 2,
};

export const farm: FarmWhithIDsOfFKs = {
  id: 2,
  cnpj: "11111111111111",
  name: "Fazenda Teste",
  phone: "3030303030",
  address_id: 2,
};

export const allPlots: PlotWhithIDsOfFKs[] = [plot];
export const allFarms: FarmWhithIDsOfFKs[] = [farm];
