import UsersRepository from "../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import { Response } from "express";

export const deleteUser = async (uuid: string) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const user = await usersRepository.findOne(uuid);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await usersRepository.delete(uuid);
};
