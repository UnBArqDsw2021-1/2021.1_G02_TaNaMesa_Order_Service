/* eslint-disable no-throw-literal */
import express, { Application } from "express";
import cors from "cors";

import routes from "./routes";

import "./db/index";

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
