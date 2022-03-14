import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../repositories/user.repository";
import { NextFunction } from "express";
import AppError from "../errors/AppError";

export const authenticateUser = async (CPF: string, next: NextFunction) => {
  try {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByCPF(CPF);

    if (!user) {
      throw new AppError("User not registered", 401);
    }

    const token = jwt.sign({ CPF: CPF }, process.env.SECRET as string, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    next(error);
  }
};
