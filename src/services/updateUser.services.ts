import UsersRepository from "../repositories/user.repository";
import { getCustomRepository, getRepository } from "typeorm";
import AppError from "../errors/AppError";
import ViaCEP from "./registerUser.services";
import { NextFunction, Request } from "express";
import User from "../entities/user.entity";

export const updateUser = async (
  body: any,
  uuid: string,
  next: NextFunction
) => {
  try {
    const data = body;
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(uuid);
    const allowedKeys = ["name", "phone", "CPF", "CEP"];

    if (!user) {
      throw new AppError("User not found", 404);
    }

    for (let key in body) {
      if (!allowedKeys.includes(key)) {
        throw new AppError(`The key: '${key}' is not allowed`, 400);
      }
    }

    if (data.cpf && data.cpf.lenght !== 11) {
      throw new AppError("CPF invalid, must have 11 characters", 400);
    }

    if (data.cep) {
      if (data.cep.lenght !== 8) {
        throw new AppError("CEP invalid, must have 8 characters", 400);
      }
      const thisCEP = new ViaCEP();
      const thisAddress = await thisCEP
        .CEP(data.cep)
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        });

      if (thisAddress!.erro) {
        throw new AppError("Invalid CEP", 400);
      }

      data.Street = thisAddress!.logradouro;
      data.City = thisAddress!.localidade;
      data.State = thisAddress!.uf;
    }

    await usersRepository.update(uuid, data);

    const updatedUser = await usersRepository.findOne(uuid);

    return updatedUser;
  } catch (error) {
    next(error);
  }
};
