import { Router } from "express";

import itemController from "../controllers/itemController";

const routes = Router();

routes.post("/", (request, response) =>
  itemController.create(request, response)
);

routes.get("/", (request, response) =>
  itemController.getAll(request, response)
);

routes.get("/:id", (request, response) =>
  itemController.getOne(request, response)
);

routes.put("/:id", (request, response) =>
  itemController.edit(request, response)
);

routes.delete("/:id", (request, response) =>
  itemController.destroy(request, response)
);

export default routes;
