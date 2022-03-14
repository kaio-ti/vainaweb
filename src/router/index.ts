import { Express } from "express";
import { loginRouter } from "./login.routes";
import { userRouter } from "./user.routes";

const routerInitializer = (app: Express) => {
  app.use("/users", userRouter());
  app.use("/login", loginRouter());
};

export default routerInitializer;
