import "reflect-metadata";
import { createConnection } from "typeorm";

export const connectDatabase = () => {
  createConnection().then(() => {
    console.log("Database Connected");
  });
};
