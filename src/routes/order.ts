import { Router } from "express";
import orderController from '../controllers/orderController';
import database from "../db";

const routes = Router();

routes.post("/", async (request, response) => await orderController.create(request, response));

routes.get("/", async (request, response) => await orderController.getAll(request, response));

routes.get("/:id", async (request, response) => await orderController.getOne(request, response));

routes.put("/:id", async (request, response) => await orderController.edit(request, response));

routes.delete("/:id", async (request, response) => await orderController.destroy(request, response));

export default routes;