import { Router } from "express";

import database from "../db";

const routes = Router();

routes.post("/", async (request, response) => {
  try {
    if (!request.body.order.status) return response.status(400).json({
      success: false,
      message: 'O campo status é obrigatório'
    })
    else if (!request.body.order.idTable) return response.status(400).json({
        success: false,
        message: 'O campo idTable é obrigatório'
    })
    else if (!request.body.order.idClient) return response.status(400).json({
        success: false,
        message: 'O campo idClient é obrigatório'
    })
    else if (!request.body.order.nameClient) return response.status(400).json({
        success: false,
        message: 'O campo nameClient é obrigatório'
    })
    return response.json({
      success: true,
      order: await database.order.create(request.body.order)
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

routes.get("/", async (request, response) => {
  try {
    return response.json({
      success: true,
      orders: await database.order.findAll()
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
      order: await database.order.findByPk(request.params.id)
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
    await database.order.update(request.body.order, { where: { idOrder: request.params.id } })
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
    await database.order.destroy({ where: { idOrder: request.params.id } })
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