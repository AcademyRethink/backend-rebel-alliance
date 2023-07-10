import farmRepository from "../repositories/farmRepository";
import { Address, FarmWhithAddress, FarmWhithIDsOfFKs } from "../../types";
import { makeError } from "../middlewares/errorHandler";
import addressRepository from "../repositories/addressRepository";

const getAllFarms = async () => {
  const farms = await farmRepository.index();

  if (!farms) {
    throw makeError({
      message: "Error getting Farms",
      status: 400,
    });
  }

  const result = farms.map(async (farm: FarmWhithIDsOfFKs) => {
    const { addressId, ...address }: any =
      await addressRepository.selectByIdWithoutJoin(farm.address_id!);

    return {
      id: farm.id,
      cpnj: farm.cnpj,
      name: farm.name,
      phone: farm.phone,
      address: address,
    };
  });

  return await Promise.all(result);
};

const registerFarm = async (
  farm: FarmWhithAddress
): Promise<FarmWhithIDsOfFKs> => {
  const existingFarm = await farmRepository.selectByCnpjWithoutJoin(farm.cnpj!);

  if (existingFarm) {
    throw makeError({
      message: "Farm already registered",
      status: 400,
    });
  }

  const newAddressData: Address = {
    street: farm.address!.street,
    number: farm.address!.number,
    complement: farm.address!.complement,
    neighborhood: farm.address!.neighborhood,
    city: farm.address!.city,
    state: farm.address!.state,
    cep: farm.address!.cep,
    reference_point: farm.address!.reference_point,
  };

  const newAddress = await addressRepository.insertNewAddress(newAddressData);

  const newFarmData: FarmWhithIDsOfFKs = {
    cnpj: farm.cnpj,
    name: farm.name,
    phone: farm.phone,
    address_id: newAddress.id,
  };

  const newFarm = await farmRepository.insertNewFarm(newFarmData);

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(newFarm.address_id!);

  const result = {
    id: newFarm.id,
    cpnj: newFarm.cnpj,
    name: newFarm.name,
    phone: newFarm.phone,
    address: address,
  };

  return result;
};

const findFarmById = async (id: number) => {
  const findFarm = await farmRepository.selectByIdWithoutJoin(id);

  if (!findFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 400,
    });
  }

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(findFarm.address_id!);

  const result = {
    id: findFarm.id,
    cpnj: findFarm.cnpj,
    name: findFarm.name,
    phone: findFarm.phone,
    address: address,
  };

  return result;
};

const findFarmByCnpj = async (cnpj: string) => {
  const findFarm = await farmRepository.selectByCnpjWithoutJoin(cnpj);

  if (!findFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 400,
    });
  }

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(findFarm.address_id!);

  const result = {
    id: findFarm.id,
    cpnj: findFarm.cnpj,
    name: findFarm.name,
    phone: findFarm.phone,
    address: address,
  };

  return result;
};

const findFarmByName = async (name: string) => {
  const findFarm = await farmRepository.selectByNameWhithoutJoin(name);

  if (!findFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 400,
    });
  }

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(findFarm.address_id!);

  const result = {
    id: findFarm.id,
    cpnj: findFarm.cnpj,
    name: findFarm.name,
    phone: findFarm.phone,
    address: address,
  };

  return result;
};

const updateFarmById = async (farm: FarmWhithAddress, farmCnpj: string) => {
  const existingFarm = await farmRepository.selectByCnpjWithoutJoin(farmCnpj);

  const newFarmData = farm;

  if (!existingFarm) {
    throw makeError({
      message: "Farm not Found",
      status: 404,
    });
  }

  if (newFarmData.address) {
    addressRepository.updateAddress(
      newFarmData.address,
      existingFarm.address_id!
    );
    delete newFarmData.address;
  }

  const updatedFarm = await farmRepository.updateFarm(
    newFarmData,
    existingFarm.id!
  );

  const { addressId, ...address }: any =
    await addressRepository.selectByIdWithoutJoin(updatedFarm.address_id!);

  const result = {
    id: updatedFarm.id,
    cpnj: updatedFarm.cnpj,
    name: updatedFarm.name,
    phone: updatedFarm.phone,
    address: address,
  };

  return result;
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
  getAllFarms,
  registerFarm,
  findFarmById,
  findFarmByCnpj,
  findFarmByName,
  updateFarmById,
  deleteFarmById,
};
