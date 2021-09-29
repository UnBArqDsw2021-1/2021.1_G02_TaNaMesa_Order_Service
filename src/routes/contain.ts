import { Router } from "express";
import containController from "../controllers/containController";

const routes = Router();

routes.post("/", (request, response) =>
  containController.create(request, response)
);

routes.get("/", (request, response) =>
  containController.getAll(request, response)
);

routes.get("/:id", (request, response) =>
  containController.getOne(request, response)
);

routes.put("/:id", (request, response) =>
  containController.edit(request, response)
);

routes.delete("/:id", (request, response) =>
  containController.destroy(request, response)
);

export default routes;
