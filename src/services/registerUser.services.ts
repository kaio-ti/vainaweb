import UsersRepository from "../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import axios, { AxiosInstance } from "axios";

interface IUserRequest {
  name: string;
  phone: string;
  CPF: string;
  CEP: string;
  Street: string;
  City: string;
  State: string;
}

interface IAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export default class ViaCEP {
  baseURL: string = "https://viacep.com.br/";
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
    });
  }

  async CEP(CEP: string) {
    const request = `ws/${CEP}/json/`;
    const response = await this.axiosInstance.get(request);
    return response.data as IAddress;
  }
}

export const registerUser = async (body: IUserRequest) => {
  const { name, phone, CPF, CEP, Street, City, State } = body;
  const allowedKeys = [
    "name",
    "phone",
    "CPF",
    "CEP",
    "Street",
    "City",
    "State",
  ];

  if (!name || !phone || !CPF || !CEP || !Street || !City || !State) {
    throw new AppError("Missing fields", 400);
  }

  for (let key in body) {
    if (!allowedKeys.includes(key)) {
      throw new AppError(`The key: '${key}' is not allowed`, 400);
    }
  }

  if (CPF.length !== 11) {
    throw new AppError("CPF invalid, must have 11 characters", 400);
  }

  if (CEP.length !== 8) {
    throw new AppError("CEP invalid, must have 8 characters", 400);
  }

  const usersRepository = getCustomRepository(UsersRepository);

  const CPFAlreadyExists = await usersRepository.findOne({ CPF });

  if (CPFAlreadyExists) {
    throw new AppError("CPF already registered", 401);
  }

  const thisCEP = new ViaCEP();
  const thisAddress = await thisCEP
    .CEP(body.CEP)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });

  if (thisAddress!.erro) {
    throw new AppError("Invalid CEP", 400);
  }

  try {
    const user = body;
    user.Street = thisAddress!.logradouro;
    user.City = thisAddress!.localidade;
    user.State = thisAddress!.uf;
    usersRepository.create(user);
    await usersRepository.save(user);
    return user;
  } catch (error) {
    throw new AppError(error, 400);
  }
};
