import { describe, expect, jest } from "@jest/globals";
import usersRepository from "../api/repositories/usersRepository";
import authService from "../api/services/authService";
import { mockedUser, mockedUserWithoutPassword } from "./mockUsers";
import { mockedFarmWhithIds } from "./harvestMock";
import farmRepository from "../api/repositories/farmRepository";

describe("User Service Tests - registerNewUser Function", () => {
  it("Register a user", async () => {
    jest
      .spyOn(usersRepository, "selectByCpfOrCnpjWithoutJoin")
      .mockResolvedValueOnce(undefined);

    jest
      .spyOn(farmRepository, "selectByCnpjWithoutJoin")
      .mockResolvedValueOnce(mockedFarmWhithIds);

    jest
      .spyOn(usersRepository, "insertNewUser")
      .mockResolvedValueOnce(mockedUser);

    const result = await authService.registerUser({
      cpf_cnpj: "04312312316",
      name: "Leticia 2",
      celphone: "97343515442",
      email: "leticia@mail.com.br",
      password: "$2b$10$SnoLNSXTjZxYIZDZX9m4AeBnjZxCETwfKw7gt3ZojarG.gn8l9WY.",
      userType: "Administrador",
      farm_cnpj: "12345678912345",
    });

    expect(result).toMatchObject(mockedUserWithoutPassword);
  });
});
