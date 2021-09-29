import { Request, Response } from "express";
import database from "../db";

const fs = require('fs');
const path = require('path')

const base64_encode = (file) => {
  const bitmap = fs.readFileSync(file);
  return new Buffer(bitmap).toString('base64');
}

const getImageName = (id: number, extension: string) =>
  'item_' + id + '.' + extension

const create = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const fieldsToValidate = ["name", "price", "description", "category"];

    fieldsToValidate.forEach((field: string): Response => {
      if (!request.body.item[field]) {
        return response.status(400).json({
          success: false,
          message: `O campo ${field} é obrigatório`,
        });
      }
      return null;
    });

    return response.json({
      success: true,
      item: await database.item.create(request.body.item),
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
    const filters = {};
    if (request.query.category) filters.category = request.query.category;

    const items = await database.item.findAll({
      where: {
        ...filters,
      },
    })
    items.forEach(item => { if (item.image) item.image = base64_encode(`uploads/${item.image}`) });

    return response.json({
      success: true,
      items
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
    const item = await database.item.findByPk(request.params.id)
    if (item.image) item.image = base64_encode(`uploads/${item.image}`);

    return response.json({
      success: true,
      item
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
    await database.item.update(request.body.item, {
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
    await database.item.destroy({ where: { idItem: request.params.id } });
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

const uploadPhoto = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    await database.item.update({ image: getImageName(request.params.id, request.file?.mimetype?.split('/')[1]) }, {
      where: { idItem: request.params.id },
    });

    return response.json({
      success: true
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

export default { create, getAll, getOne, edit, destroy, uploadPhoto };
