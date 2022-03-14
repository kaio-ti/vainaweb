import { Request, Response, NextFunction } from "express";
import { updateUser } from "../services/updateUser.services";

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateUser(req.body);
    if (user) {
      return res.send(user);
    }
  } catch (error) {
    next(error);
  }
};
