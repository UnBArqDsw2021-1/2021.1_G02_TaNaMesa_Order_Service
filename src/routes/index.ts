import { Router } from "express";
import orderRoutes from'./order'

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

<<<<<<< HEAD
routes.use('/orders', orderRoutes)
=======
routes.use('/employee', employeeRoutes);
>>>>>>> 6ba0470336749c81e5fe6a7ff860c4d78d846cd5

export default routes;
