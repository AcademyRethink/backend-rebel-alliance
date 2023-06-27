import {
  HarvestWhithIDsOfFKs,
  HarvestWhithNamesOfFKs,
} from "../types/harvestTypes";

import { FarmWhithIDsOfFKs } from "./farmTypes";
import { PlotWhithIDsOfFKs } from "./plotTypes";
import { UsersWhithIDsOfFKs } from "./usersTypes";

type ErrorType = {
  message: string;
  status: number;
  stack?: string;
};

export {
  ErrorType,
  HarvestWhithIDsOfFKs,
  HarvestWhithNamesOfFKs,
  FarmWhithIDsOfFKs,
  PlotWhithIDsOfFKs,
  UsersWhithIDsOfFKs,
};
