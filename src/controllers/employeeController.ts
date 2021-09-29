import { Request, Response } from "express";
import bcrypt from "bcrypt";
import database from "../db";

const create = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const fieldsToValidate = ["cpf", "name", "occupation", "password"];

    let error = false;
    let fieldName;

    fieldsToValidate.forEach((field: string): void => {
      if (!request.body.employee[field]) {
        error = true;
        fieldName = field;
      }
    });

    if (error) {
      return response.status(400).json({
        success: false,
        message: `O campo ${fieldName} é obrigatório.`,
      });
    }

    request.body.employee.password = await bcrypt.hash(
      request.body.employee.password,
      10
    );

    return response.json({
      success: true,
      employee: await database.employee.create(request.body.employee),
    });
  } catch (error) {
    console.log("ERROR --> ", error);
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
      employees: await database.employee.findAll(),
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
      employee: await database.employee.findByPk(request.params.cpf),
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
    await database.employee.update(request.body.employee, {
      where: { cpf: request.params.cpf },
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
    await database.employee.destroy({ where: { cpf: request.params.cpf } });
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
