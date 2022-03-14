import { NextFunction, Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import UsersRepository from "../repositories/user.repository";
import { deleteUser } from "../services/deleteUser.services";

export const removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { uuid } = req.params;
  try {
    await deleteUser(uuid);
    return res.status(200).json({ message: "User deleted with success" });
  } catch (error) {
    next(error);
  }
};
