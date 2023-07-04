import QueryString from "qs";

type PlantingsWithIds = {
  id?: number;
  date?: string;
  saplings?: number;
  plot_id?: number;
  stages_id?: number;
  user_id?: number;
  farm_id?: number;
};

type PlantingsWithNames = {
  id?: number;
  date: string;
  saplings: number;
  plot: string;
  stage: string;
  user: string;
  farm: string;
};

type ColumnId = {
  id: number;
};

type WhereType = {
  "planting.farm_id"?: QueryStringOrNumber;
  "planting.plot_id"?: QueryStringOrNumber;
  "planting.date"?: QueryStringOrNumber;
};

type QueryStringOrNumber =
  | number
  | string
  | string[]
  | QueryString.ParsedQs
  | QueryString.ParsedQs[]
  | undefined;

export {
  PlantingsWithIds,
  PlantingsWithNames,
  ColumnId,
  WhereType,
  QueryStringOrNumber,
};
