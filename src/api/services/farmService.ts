import farmRepository from "../repositories/farmRepository";
import { FarmWhithIDsOfFKs } from "../../types";
import { makeError } from "../middlewares/errorHandler";

const registerFarm = async (
  farm: FarmWhithIDsOfFKs
): Promise<FarmWhithIDsOfFKs> => {
  const existingFarm = await farmRepository.selectByNameWhithoutJoin(
    farm.name!
  );

  if (existingFarm) {
    throw makeError({
      message: "Farm already registered",
      status: 400,
    });
  }

  const newFarmData: FarmWhithIDsOfFKs = {
    cnpj: farm.cnpj,
    name: farm.name,
    phone: farm.phone,
    address_id: farm.address_id,
  };

  const newFarm = await farmRepository.insertNewFarm(newFarmData);

  return newFarm;
};

const findFarmById = async (id: number) => {
  const findFarm = await farmRepository.selectByIdWithoutJoin(id);

  if (!findFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 400,
    });
  }

  return findFarm;
};

const findFarmByCnpj = async (cnpj: string) => {
  const findFarm = await farmRepository.selectByCnpjWithoutJoin(cnpj);

  if (!findFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 400,
    });
  }

  return findFarm;
};

const findFarmByName = async (name: string) => {
  const findFarm = await farmRepository.selectByNameWhithoutJoin(name);

  if (!findFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 400,
    });
  }

  return findFarm;
};

const updateFarmById = async (farm: FarmWhithIDsOfFKs, farmId: number) => {
  const existingFarm = await farmRepository.selectByIdWithoutJoin(farmId);

  if (!existingFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 404,
    });
  }

  const newFarmData: FarmWhithIDsOfFKs = {
    cnpj: farm.cnpj,
    name: farm.name,
    phone: farm.phone,
    address_id: farm.address_id,
  };

  await farmRepository.updateFarm(newFarmData, farmId);
  const updatedFarm = await farmRepository.selectByIdWithoutJoin(farmId);

  return updatedFarm;
};

const deleteFarmById = async (id: number) => {
  const existingFarm = await farmRepository.selectByIdWithoutJoin(id);

  if (!existingFarm) {
    throw makeError({
      message: "Farm not found",
      status: 404,
    });
  }

  const isDeleted = await farmRepository.deleteFarm(id);

  if (isDeleted) return true;

  return false;
};

export default {
  registerFarm,
  findFarmById,
  findFarmByCnpj,
  findFarmByName,
  updateFarmById,
  deleteFarmById,
};

// findFarmByName("Fazenda Rebel Alliance")
//   .then((item) => {
//     console.log(item);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// registerFarm({
//   cnpj: "12312312312",
//   name: "littlefazend",
//   phone: "alaoalaoalao",
// })
//   .then((item) => {
//     console.log(item);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// updateFarmById(21, {
//   street: "zababaubazabazaba",
//   number: 24,
//   complement: "complemento",
//   neighborhood: "nsei",
//   city: "cidade",
//   state: "aafolou",
//   cep: "cep",
//   reference_point: "aaaaaaaaa",
// })
//   .then((item) => {
//     console.log(item);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// deleteFarmById(20)
//   .then((item) => {
//     console.log(item);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
