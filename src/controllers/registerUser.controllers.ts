import { Request, Response, NextFunction } from "express";
import { registerUser } from "../services/registerUser.services";
import AppError from "../errors/AppError";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUser(req.body);

    return res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};
