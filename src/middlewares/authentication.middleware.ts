import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (header !== undefined) {
    let token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Missing authorization headers" });
      next();
    }

    jwt.verify(
      token as string,
      process.env.SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          next(err);
        }

        const userId = decoded.id;
        req.user = { uuid: userId };

        next();
      }
    );
  } else {
    res.status(401).json({ message: "Missing authorization header" });
  }
};
