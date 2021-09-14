import { Router } from "express";
import orderRoutes from'./order'
import tableRoutes from'./table'

import employeeRoutes from './employee';

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

routes.use('/orders', orderRoutes)
routes.use('/employee', employeeRoutes);
routes.use('/table', tableRoutes);

export default routes;
