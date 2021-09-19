import { Router } from "express";

import clientController from "../controllers/employeeController";

const routes = Router();

routes.post("/", (request, response) =>
  clientController.create(request, response)
);

routes.get("/", (request, response) =>
  clientController.getAll(request, response)
);

routes.get("/:cpf", (request, response) =>
  clientController.getOne(request, response)
);

routes.put("/:cpf", (request, response) =>
  clientController.edit(request, response)
);

routes.delete("/:cpf", (request, response) =>
  clientController.destroy(request, response)
);

export default routes;
