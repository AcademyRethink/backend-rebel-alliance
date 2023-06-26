type PlantingsWithIds = {
  id?: number;
  date?: Date;
  saplings?: number;
  plot?: string;
  stage?: string;
  user?: string;
  farm?: string;
};

type PlantingsWitNames = {
  id?: number;
  date?: Date;
  saplings?: number;
  plot_id?: number;
  stage_id?: number;
  user_id?: number;
  farm_id?: number;
};

export { PlantingsWithIds, PlantingsWitNames };
