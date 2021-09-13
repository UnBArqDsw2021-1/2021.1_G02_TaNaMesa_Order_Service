import { Router } from "express";

import itemController from '../controllers/itemController';

const routes = Router();

routes.post("/", async (request, response) => await itemController.create(request, response));

routes.get("/", async (request, response) => await itemController.getAll(request, response));

routes.get("/:id", async (request, response) => await itemController.getOne(request, response));

routes.put("/:id", async (request, response) => await itemController.edit(request, response));

routes.delete("/:id", async (request, response) => await itemController.destroy(request, response));


export default routes;

