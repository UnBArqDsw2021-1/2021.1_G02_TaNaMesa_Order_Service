import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import routes from "./routes";

import "./db/index";

require("dotenv/config");

class App {
  public server: Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
