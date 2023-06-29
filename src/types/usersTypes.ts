type UsersWhithIDsOfFKs = {
  id?: number;
  cpf_cnpj?: string;
  name?: string;
  celphone?: string;
  email?: string;
  password?: string;
  userType?: string;
  farm_id?: number;
};

type UsersWhithNamesOfFKs = {
  id?: number;
  cpf_cnpj?: string;
  name?: string;
  celphone?: string;
  email?: string;
  password?: string;
  userType?: string;
  farm_name?: string;
};

export { UsersWhithIDsOfFKs, UsersWhithNamesOfFKs };
