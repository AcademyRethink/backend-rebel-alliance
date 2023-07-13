type PlotWhithIDsOfFKs = {
  id?: number;
  name?: string;
  farm_id?: number;
};

type PlotWithPlatingData = {
  farm_id: number;
  plot_id: number;
  plot_name: string;
  planting_id: number;
  planting_date: string;
  saplings: number;
  stage: string;
  harvests: string;
};

export { PlotWhithIDsOfFKs, PlotWithPlatingData };
