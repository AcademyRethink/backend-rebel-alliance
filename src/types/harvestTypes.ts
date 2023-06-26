type HarvestWhithIDsOfFKs = {
  id?: number;
  date?: string;
  bags?: number;
  plot_id?: number;
  farm_id?: number;
};

type HarvestWhithNamesOfFKs = {
  id?: number;
  date?: string;
  bags?: number;
  plot_name?: number;
  farm_name?: number;
};

export { HarvestWhithIDsOfFKs, HarvestWhithNamesOfFKs };
