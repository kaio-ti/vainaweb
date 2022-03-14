import { getCustomRepository, getRepository } from "typeorm";
import User from "../entities/user.entity";
import AppError from "../errors/AppError";
import UsersRepository from "../repositories/user.repository";

export const findCPF = async (cpf: string) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const user = await usersRepository.findByCPF(cpf);

  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};

export const findCEP = async (cep: string) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.findByCEP(cep);

  if (!users) {
    throw new AppError("No users in this adress", 404);
  }
  return users;
};
