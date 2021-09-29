import { Router } from "express";
import itemController from "../controllers/itemController";

const path = require('path')
const multer = require('multer')

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) return cb(null, true);
  else cb('Error: Os formatos permitidos sao jpeg/jpg/png!');
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, 'item_' + req.params.id + '.' + file?.mimetype?.split('/')[1])
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb)
  }
})

const upload = multer({ storage: storage })
const routes = Router()

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

routes.put("/:id/image", upload.single('image'), (request, response) =>
  itemController.uploadPhoto(request, response)
);

export default routes;