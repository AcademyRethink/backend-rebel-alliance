import usersRepository from "../repositories/usersRepository";
import farmRepository from "../repositories/farmRepository";
import {
  FarmWhithIDsOfFKs,
  UsersWhithIDsOfFKs,
  UsersWhithNamesOfFKs,
} from "../../types";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { makeError } from "../middlewares/errorHandler";
import jwt from "jsonwebtoken";

dotenv.config();

const mySecret = process.env.SECRET || "K7s9P3x2Y5";

const registerUser = async (
  user: UsersWhithNamesOfFKs
): Promise<{ newUser: UsersWhithNamesOfFKs; token: string }> => {
  const saltRounds = Number(process.env.SALT) ?? 10;

  const existingUser = await usersRepository.selectByCpfOrCnpjWithoutJoin(
    user.cpf_cnpj!
  );

  if (existingUser) {
    throw makeError({
      message: "User already registered",
      status: 400,
    });
  }

  // const existingFarm = await farmRepository.selectByNameWhithoutJoin(
  //   user.farm_id!
  // );

  // if (!existingFarm) {
  //   throw makeError({
  //     message: "Farm not Found",
  //     status: 400,
  //   });
  // }

  const newUserData: UsersWhithIDsOfFKs = {
    cpf_cnpj: user.cpf_cnpj,
    name: user.name,
    celphone: user.celphone,
    email: user.email,
    password: await bcrypt.hash(user.password!, saltRounds),
    userType: user.userType,
    farm_id: user.farm_id,
  };

  const newUser = await usersRepository.insertNewUser(newUserData);

  const token = jwt.sign(
    { id: newUser.id, userType: newUser.userType },
    mySecret,
    { expiresIn: "1d" }
  );

  localStorage.setItem("token", token);

  return { newUser, token };
};

const authenticateUser = async (user: UsersWhithIDsOfFKs) => {
  const selectedUser = await usersRepository.selectByCpfOrCnpjWithoutJoin(
    user.cpf_cnpj!
  );

  if (!selectedUser) {
    throw makeError({
      message: "User not Found",
      status: 400,
    });
  }

  const verifyPassword = await bcrypt.compare(
    user.password!,
    selectedUser.password!
  );

  if (!verifyPassword) {
    throw makeError({
      message: "Wrong Password",
      status: 400,
    });
  }

  const token = jwt.sign(
    { id: selectedUser.id, userType: selectedUser.userType },
    mySecret,
    { expiresIn: "1d" }
  );

  localStorage.setItem("token", token);

  return { selectedUser, token };
};

const logoutUser = () => {
  localStorage.removeItem("token");
};

const findUserById = async (id: number) => {
  const findUser = await usersRepository.selectByIdWithoutJoin(id);

  if (!findUser) {
    throw makeError({
      message: "User not Found",
      status: 400,
    });
  }

  return findUser;
};

const findUserByCpfOrCnpj = async (cpfOrCnpj: string) => {
  const findUser = await usersRepository.selectByCpfOrCnpjWithoutJoin(
    cpfOrCnpj
  );

  if (!findUser) {
    throw makeError({
      message: "User not Found",
      status: 400,
    });
  }

  return findUser;
};

const findUserByName = async (name: string) => {
  const findUser = await usersRepository.selectByNameWithoutJoin(name);

  if (!findUser) {
    throw makeError({
      message: "User not Found",
      status: 400,
    });
  }

  return findUser;
};

const updateUserById = async (userId: number, user: UsersWhithIDsOfFKs) => {
  const saltRounds = Number(process.env.SALT) ?? 10;

  const existingUser = await usersRepository.selectByIdWithoutJoin(userId);

  if (!existingUser) {
    throw makeError({
      message: "User not Found",
      status: 404,
    });
  }

  const newUserData: UsersWhithIDsOfFKs = {
    cpf_cnpj: user.cpf_cnpj,
    name: user.name,
    celphone: user.celphone,
    email: user.email,
    password: await bcrypt.hash(user.password!, saltRounds),
    userType: user.userType,
    farm_id: user.farm_id,
  };

  await usersRepository.updateUser(newUserData, userId);
  const updatedUser = await usersRepository.selectByIdWithoutJoin(userId);

  return updatedUser;
};

const deleteUserById = async (id: number) => {
  const existingUser = await usersRepository.selectByIdWithoutJoin(id);

  if (!existingUser) {
    throw makeError({
      message: "User not found",
      status: 404,
    });
  }

  const isDeleted = await usersRepository.deleteUser(id);

  if (isDeleted) return true;

  return false;
};

export default {
  registerUser,
  authenticateUser,
  findUserById,
  findUserByCpfOrCnpj,
  findUserByName,
  updateUserById,
  deleteUserById,
};
