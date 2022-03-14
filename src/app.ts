import "reflect-metadata";
import express from "express";
import routerInitializer from "./router";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

routerInitializer(app);

app.use(errorHandler);

export default app;
