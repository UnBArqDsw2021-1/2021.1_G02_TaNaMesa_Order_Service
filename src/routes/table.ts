import { Router } from "express";
import tableController from '../controllers/tableController';

const routes = Router();

routes.post("/", async (request, response) => await tableController.create(request, response));

routes.get("/", async (request, response) => await tableController.getAll(request, response));

routes.get("/:id", async (request, response) => await tableController.getOne(request, response));

routes.put("/:id", async (request, response) => await tableController.edit(request, response));

routes.delete("/:id", async (request, response) => await tableController.destroy(request, response));

export default routes;
