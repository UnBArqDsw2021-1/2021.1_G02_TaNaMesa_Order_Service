import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import database from "../db";

require("dotenv/config");

const login = async (
  request: Request,
  response: Response
): Promise<Response> => {
  try {
    const user = await database.employee.findByPk(request.body.cpf);

    const match = await bcrypt.compare(request.body.password, user.password);

    if (request.body.cpf === user.cpf && match) {
      const token = jwt.sign({}, process.env.SECRET, {
        subject: "1234",
        expiresIn: 86400,
      });
      return response.json({ auth: true, token });
    }

    return response.status(500).json({ message: "Login inválido!" });
  } catch (error) {
    return response.status(500).json({ message: "Login inválido!" });
  }
};

export default { login };
