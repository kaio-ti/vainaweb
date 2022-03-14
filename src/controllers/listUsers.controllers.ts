import { NextFunction, Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import AppError from "../errors/AppError";
import UsersRepository from "../repositories/user.repository";
import { findCEP, findCPF } from "../services/listUsers.services";

export const listUsers = async (req: Request, res: Response) => {
  const usersRepository = getCustomRepository(UsersRepository);
  const users = await usersRepository.get();

  return res.send(users);
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cpf } = req.params;
  try {
    const user = await findCPF(cpf);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const listCEP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cep } = req.params;
  try {
    const user = await findCEP(cep);
    res.send(user);
  } catch (error) {
    next(error);
  }
};
