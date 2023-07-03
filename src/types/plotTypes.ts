type PlotWhithIDsOfFKs = {
  id?: number;
  name?: string;
  farm_id?: number;
};

type PlotWithFarmName = {
  name: string;
  farm: string;
};

export { PlotWhithIDsOfFKs, PlotWithFarmName };
