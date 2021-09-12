import { Router } from "express";

import clientRoutes from './client';
import itemRoutes from './item';

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

routes.use('/client', clientRoutes);
routes.use('/item', itemRoutes);

export default routes;
