import { Router } from "express";

import clientRoutes from "./client";
import containRoutes from "./contain";
import employeeRoutes from "./employee";
import itemRoutes from "./item";
import orderRoutes from "./order";
import tableRoutes from "./table";

const routes = Router();

routes.get("/", (request, response) => {
  return response.json({
    message: "Hello World, Tá Na Mesa!",
    members: [
      "Lucas",
      "Eduarda",
      "Sérgio",
      "Hérick",
      "Brenda",
      "Ítalo",
      "Emily",
      "Tiago",
      "Daniel",
      "Abner",
    ],
  });
});

routes.use("/client", clientRoutes);
routes.use("/contain", containRoutes);
routes.use("/employee", employeeRoutes);
routes.use("/item", itemRoutes);
routes.use("/order", orderRoutes);
routes.use("/table", tableRoutes);

export default routes;
