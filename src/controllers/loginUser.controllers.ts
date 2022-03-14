import { NextFunction, Request, Response } from "express";
import { authenticateUser } from "../services/loginUser.services";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { CPF } = req.body;
    const token = await authenticateUser(CPF, next);

    if (token) {
      res.status(200).json({ token });
    }
  } catch (error) {
    next(error);
  }
};
