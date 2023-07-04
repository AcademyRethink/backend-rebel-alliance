import {
  HarvestWhithIDsOfFKs,
  HarvestWhithNamesOfFKs,
} from "../types/harvestTypes";

import { UsersWhithIDsOfFKs, UsersWhithNamesOfFKs } from "./usersTypes";
import { FarmWhithIDsOfFKs, FarmWhithAddress } from "./farmTypes";
import { Address } from "./addressTypes";
import { PlotWhithIDsOfFKs } from "./plotTypes";

type ErrorType = {
  message: string;
  status: number;
  stack?: string;
};

export {
  ErrorType,
  HarvestWhithIDsOfFKs,
  HarvestWhithNamesOfFKs,
  UsersWhithIDsOfFKs,
  UsersWhithNamesOfFKs,
  FarmWhithIDsOfFKs,
  FarmWhithAddress,
  Address,
  PlotWhithIDsOfFKs,
};
