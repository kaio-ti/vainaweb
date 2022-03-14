import UsersRepository from "../repositories/user.repository";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import ViaCEP from "./registerUser.services";
import { Request } from "express";

export const updateUser = async (req: Request) => {
  const { uuid } = req.params;
  const { data } = req.body;

  const usersRepository = getCustomRepository(UsersRepository);
  const user = await usersRepository.findOne(uuid);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (data.CPF && data.CPF.lenght !== 11) {
    throw new AppError("CPF invalid, must have 11 characters", 400);
  }

  if (data.CEP && data.CEP.lenght !== 8) {
    throw new AppError("CEP invalid, must have 8 characters", 400);
  }

  if (data.CEP) {
    const thisCEP = new ViaCEP();
    const thisAddress = await thisCEP
      .CEP(data?.CEP)
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

  try {
    await usersRepository.update(uuid, data);
    const updatedUser = await usersRepository.findById(uuid);
    return updatedUser;
  } catch (error) {
    throw new AppError(error, 400);
  }
};
