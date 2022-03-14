import { Router } from "express";
import { login } from "../controllers/loginUser.controllers";

const router = Router();

export const loginRouter = () => {
  router.post("/", login);

  return router;
};
