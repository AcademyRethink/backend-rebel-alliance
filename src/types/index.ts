import {
  HarvestWhithIDsOfFKs,
  HarvestWhithNamesOfFKs,
} from "../types/harvestTypes";

type ErrorType = {
  message: string;
  status: number;
  stack?: string;
};

export { ErrorType, HarvestWhithIDsOfFKs, HarvestWhithNamesOfFKs };
