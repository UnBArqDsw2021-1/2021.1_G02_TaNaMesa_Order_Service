import { Router } from "express";

import authController from "../controllers/authController";

const routes = Router();

routes.post("", (request, response) => authController.login(request, response));

export default routes;
