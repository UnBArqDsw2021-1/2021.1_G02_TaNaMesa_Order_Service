import { Router } from "express";

import orderRoutes from "./order";
import tableRoutes from "./table";
import employeeRoutes from "./employee";
import clientRoutes from "./client";
import itemRoutes from "./item";
import authRoutes from "./auth";
import ensureAuth from "../middlewares/ensureAuth";

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

routes.use("/login", authRoutes);
routes.use("/orders", ensureAuth, orderRoutes);
routes.use("/table", ensureAuth, tableRoutes);
routes.use("/employee", employeeRoutes);
routes.use("/client", ensureAuth, clientRoutes);
routes.use("/item", ensureAuth, itemRoutes);

export default routes;
