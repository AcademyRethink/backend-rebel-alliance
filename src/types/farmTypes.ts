type FarmWhithIDsOfFKs = {
  id?: number;
  cnpj?: string;
  name?: string;
  phone?: string;
  address_id?: number;
};

type FarmWhithAddress = {
  id?: number;
  cnpj?: string;
  name?: string;
  phone?: string;
  street?: string;
  number?: number;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  cep?: string;
  reference_point?: string;
};

export { FarmWhithIDsOfFKs, FarmWhithAddress };
