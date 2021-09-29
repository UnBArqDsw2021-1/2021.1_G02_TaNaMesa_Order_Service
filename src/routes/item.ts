/* eslint-disable */
import { Router } from "express";
import multer from "multer";
import path from "path";

import itemController from "../controllers/itemController";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads");
  },
  filename(req, file, cb) {
    cb(null, `item_${req.params.id}.${file?.mimetype?.split("/")[1]}`);
  },
});

const upload = multer({ storage });
const routes = Router();

routes.post("/", (request, response) =>
  itemController.create(request, response)
);

routes.get("/", (request, response) =>
  itemController.getAll(request, response)
);

routes.get("/:id", (request, response) =>
  itemController.getOne(request, response)
);

routes.put("/:id", (request, response) =>
  itemController.edit(request, response)
);

routes.delete("/:id", (request, response) =>
  itemController.destroy(request, response)
);

routes.put("/:id/image", upload.single("image"), (request, response) =>
  itemController.uploadPhoto(request, response)
);

export default routes;
