import { Response, NextFunction } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import UsersRepository from "../repositories/user.repository";

export const isAuthorized = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getCustomRepository(UsersRepository);
  const user = await userRepository.findOne(req.user.uuid);
  const { uuid } = req.params;

  console.log(user);
  if (uuid !== user?.uuid) {
    res.status(401).send({ message: "User not authorized" });
  }
  next();
};
