import { register } from "../controllers/registerUser.controllers";
import {
  listUsers,
  getUser,
  listCEP,
} from "../controllers/listUsers.controllers";
import { editUser } from "../controllers/patchUser.controllers";
import { removeUser } from "../controllers/deleteUsers.controllers";
import { isAuthenticated } from "../middlewares/authentication.middleware";
import { isAuthorized } from "../middlewares/authorization.middleware";
import { Router } from "express";

const router = Router();

export const userRouter = () => {
  router.post("/register", register);
  router.get("/", isAuthenticated, listUsers);
  router.get("/cep/:cep", isAuthenticated, listCEP);
  router.get("/cpf/:cpf", isAuthenticated, getUser);
  router.patch("/:uuid", isAuthenticated, editUser); //isAuthorized,
  router.delete("/:uuid", isAuthenticated, removeUser); //isAuthorized,

  return router;
};
