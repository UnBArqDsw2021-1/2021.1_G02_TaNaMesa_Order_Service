import { Router } from "express";
import orderController from "../controllers/orderController";

const routes = Router();

routes.post("/", (request, response) =>
  orderController.create(request, response)
);

routes.get("/", (request, response) =>
  orderController.getAll(request, response)
);

routes.get("/:id", (request, response) =>
  orderController.getOne(request, response)
);

routes.put("/:id", (request, response) =>
  orderController.edit(request, response)
);

routes.delete("/:id", (request, response) =>
  orderController.destroy(request, response)
);

export default routes;
