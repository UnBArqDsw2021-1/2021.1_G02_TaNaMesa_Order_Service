import { Router } from "express";

import database from "../db";

const routes = Router();

routes.post("/", async (request, response) => {
  try {
    const fieldsToValidate = ['name', 'price', 'description', 'category'];
    for (let field of fieldsToValidate) {
      if (!request.body.item[field]) {
        return response.status(400).json({
          success: false,
          message: `O campo ${field} é obrigatório`
        });
      }
    }
    return response.json({
      success: true,
      item: await database.item.create(request.body.item)
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    });
  }
});

routes.get("/", async (request, response) => {
  try {
    let filters = {}
    if (request.query.category)
      filters.category = request.query.category

    return response.json({
      success: true,
      items: await database.item.findAll({
        where: {
          ...filters
        }
      })
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
});

routes.get("/:id", async (request, response) => {
  try {
    return response.json({
      success: true,
      item: await database.item.findByPk(request.params.id)
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
});

routes.put("/:id", async (request, response) => {
  try {
    await database.item.update(request.body.item, { where: { idItem: request.params.id } })
    return response.json({
      success: true
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
});

routes.delete("/:id", async (request, response) => {
  try {
    await database.item.destroy({ where: { idItem: request.params.id } })
    return response.json({
      success: true
    });
  } catch (error) {
    console.log('ERROR ---> ', error);
    return response.status(500).json({
      success: false,
      message: 'Ocorreu um erro ao realizar a operação, tente novamente mais tarde.',
      error: error.toString()
    })
  }
});


export default routes;
