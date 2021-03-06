import { Request, Response } from "express";
import bcrypt from "bcrypt";
import database from "../db";

const create = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    if (!request.body.table.cpfWaiter)
      return response.status(400).json({
        success: false,
        message: "O campo cpfGarcom é obrigatório",
      });

    return response.json({
      success: true,
      table: await database.table.create({
        ...request.body.table,
        password: await bcrypt.hash("123456", 10),
      }),
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
    return response.json({
      success: true,
      tables: await database.table.findAll({
        where: request.query,
      }),
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
      table: await database.table.findByPk(request.params.id),
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
    await database.table.update(request.body.table, {
      where: { idTable: request.params.id },
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
    await database.table.destroy({ where: { idTable: request.params.id } });
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
