import { Router } from "express";
import tableController from "../controllers/tableController";

const routes = Router();

routes.post("/", (request, response) =>
  tableController.create(request, response)
);

routes.get("/", (request, response) =>
  tableController.getAll(request, response)
);

routes.get("/:id", (request, response) =>
  tableController.getOne(request, response)
);

routes.put("/:id", (request, response) =>
  tableController.edit(request, response)
);

routes.delete("/:id", (request, response) =>
  tableController.destroy(request, response)
);

export default routes;
