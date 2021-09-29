import express, { Router } from "express";

import orderRoutes from "./order";
import tableRoutes from "./table";
import employeeRoutes from "./employee";

import clientRoutes from "./client";
import containRoutes from "./contain";
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
routes.use("/order", ensureAuth, orderRoutes);
routes.use("/table", ensureAuth, tableRoutes);
routes.use("/employee", ensureAuth, employeeRoutes);
routes.use("/client", ensureAuth, clientRoutes);
routes.use("/item", ensureAuth, itemRoutes);
routes.use("/contain", ensureAuth, containRoutes);

routes.use("/uploads", express.static("uploads"));

export default routes;
