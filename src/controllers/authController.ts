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
    const { cpf } = request.body;

    const user = await database.employee.findByPk(cpf);
    const match = await bcrypt.compare(request.body.password, user.password);

    if (user.cpf === cpf && match) {
      const token = jwt.sign({}, process.env.SECRET, {
        subject: "1234",
        expiresIn: 86400,
      });
      return response.json({ auth: true, token });
    }

    return response.status(500).json({ message: "Login inválido!" });
  } catch (error) {
    try {
      const { table: idTable } = request.body;

      const table = await database.table.findByPk(idTable);
      const match = await bcrypt.compare(request.body.password, table.password);

      if (Number(idTable) === table.idTable && match) {
        const token = jwt.sign({}, process.env.SECRET, {
          subject: "1234",
          expiresIn: 86400,
        });
        return response.json({ auth: true, token });
      }
      return response.status(500).json({ message: "Login inválido!" });
    } catch (error2) {
      return response.status(500).json({ message: "Login inválido!" });
    }
  }
};

export default { login };
