import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

require("dotenv/config");

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({
      status: "error",
      message: "JWT token não existe no header",
    });

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.SECRET);
    const { sub } = decoded as ITokenPayload;

    req.user = { id: sub };

    return next();
  } catch {
    return res.status(401).json({
      status: "error",
      message: "JWT token inválido",
    });
  }
}
