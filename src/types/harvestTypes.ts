type HarvestWhithIDsOfFKs = {
  id?: number;
  date?: string;
  bags?: number;
  plot_id?: number;
  user_id?: number;
  farm_id?: number;
};

type HarvestWhithNamesOfFKs = {
  id?: number;
  date?: string;
  bags?: number;
  plot_name?: number;
  user_name?: string;
  farm_name?: number;
};

export { HarvestWhithIDsOfFKs, HarvestWhithNamesOfFKs };
