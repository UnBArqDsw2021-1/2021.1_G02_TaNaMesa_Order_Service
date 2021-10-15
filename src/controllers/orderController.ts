import { Request, Response } from "express";
import database from "../db";

const create = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const fieldsToValidate = ["status", "idTable", "idClient", "nameClient"];

    fieldsToValidate.forEach((field: string): Response => {
      if (!request.body.order[field]) {
        return response.status(400).json({
          success: false,
          message: `O campo ${field} é obrigatório.`,
        });
      }
      return null;
    });

    return response.json({
      success: true,
      order: await database.order.create(request.body.order),
    });
  } catch (error) {
    console.log("ERROR ---> ", error);
    return response.status(500).json({
      success: false,
      message:
        "Ocorreu um erro ao realizar a operação, tente novamente mais tarde.",
      error: error.toString(),
    });
  }
};

const getAll = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const orders = await database.order.findAll({
      where: request.query,
      include: [
        { model: database.client },
        { model: database.table, attributes: ['idTable', 'cpfWaiter', 'needHelp', 'createdAt', 'updatedAt'] }
      ]
    })

    const ordersWithItems = [];

    for (let order of orders) {
      const items = []

      const relations = await database.contain.findAll({ where: { idOrder: order.idOrder } });

      for (let rel of relations) {
        const item = await database.item.findByPk(rel.idItem);

        items.push(item);
      }

      ordersWithItems.push({ ...order.toJSON(), items })
    }

    return response.json({
      success: true,
      orders: ordersWithItems
    });
  } catch (error) {
    console.log("ERROR ---> ", error);
    return response.status(500).json({
      success: false,
      message:
        "Ocorreu um erro ao realizar a operação, tente novamente mais tarde.",
      error: error.toString(),
    });
  }
};

const getOne = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    return response.json({
      success: true,
      order: await database.order.findByPk(request.params.id),
    });
  } catch (error) {
    console.log("ERROR ---> ", error);
    return response.status(500).json({
      success: false,
      message:
        "Ocorreu um erro ao realizar a operação, tente novamente mais tarde.",
      error: error.toString(),
    });
  }
};

const edit = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    await database.order.update(request.body.order, {
      where: { idOrder: request.params.id },
    });
    return response.json({
      success: true,
    });
  } catch (error) {
    console.log("ERROR ---> ", error);
    return response.status(500).json({
      success: false,
      message:
        "Ocorreu um erro ao realizar a operação, tente novamente mais tarde.",
      error: error.toString(),
    });
  }
};

const destroy = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    await database.order.destroy({ where: { idOrder: request.params.id } });
    return response.json({
      success: true,
    });
  } catch (error) {
    console.log("ERROR ---> ", error);
    return response.status(500).json({
      success: false,
      message:
        "Ocorreu um erro ao realizar a operação, tente novamente mais tarde.",
      error: error.toString(),
    });
  }
};

export default { create, getAll, getOne, edit, destroy };
