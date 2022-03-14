import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import UsersRepository from "../repositories/user.repository";

export const removeUser = async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const usersRepository = getCustomRepository(UsersRepository);
  await usersRepository.delete(uuid);

  return res.send({ message: "User deleted with success" });
};
