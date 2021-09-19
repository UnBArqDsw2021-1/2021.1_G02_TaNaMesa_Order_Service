import { Router } from "express";

import clientController from "../controllers/clientController";

const routes = Router();

routes.post("/", (request, response) =>
  clientController.create(request, response)
);

routes.get("/", (request, response) =>
  clientController.getAll(request, response)
);

routes.get("/:id", (request, response) =>
  clientController.getOne(request, response)
);

routes.put("/:id", (request, response) =>
  clientController.edit(request, response)
);

routes.delete("/:id", (request, response) =>
  clientController.destroy(request, response)
);

export default routes;
