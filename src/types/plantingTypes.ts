type PlantingsWithIds = {
  id?: number;
  date?: Date;
  saplings?: number;
  plot_id?: number;
  stages_id?: number;
  user_id?: number;
  farm_id?: number;
};

type PlantingsWithNames = {
  id?: number;
  date: Date;
  saplings: number;
  plot: string;
  stage: string;
  user: string;
  farm: string;
};

type ColumnId = {
  id: number;
};

export { PlantingsWithIds, PlantingsWithNames, ColumnId };
