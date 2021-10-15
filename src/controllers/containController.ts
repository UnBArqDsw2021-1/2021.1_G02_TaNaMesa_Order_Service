import { Request, Response } from "express";
import database from "../db";

const create = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const fieldsToValidate = ["idOrder", "idItem"];

    fieldsToValidate.forEach((field: string): Response => {
      if (!request.body.contain[field]) {
        return response.status(400).json({
          success: false,
          message: `O campo ${field} é obrigatório`,
        });
      }
      return null;
    });

    return response.json({
      success: true,
      contain: await database.contain.create(request.body.contain),
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
    const contains = await database.contain.findAll({
      where: request.query,
    });

    const containsWithItem = []

    for (let contain of contains) {
      const item = await database.item.findByPk(contain.idItem);
      const order = await database.order.findByPk(contain.idOrder);
      containsWithItem.push({ ...contain.toJSON(), item, order })
    }

    return response.json({
      success: true,
      contains: containsWithItem
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
    const contain = await database.contain.findByPk(request.params.id);
    const item = await database.item.findByPk(contain.idItem);
    const order = await database.order.findByPk(contain.idOrder);

    return response.json({
      success: true,
      contain: { ...contain.toJSON(), item, order },
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
    await database.contain.update(request.body.contain, {
      where: { idItem: request.params.id },
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
    await database.contain.destroy({ where: { idItem: request.params.id } });
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
