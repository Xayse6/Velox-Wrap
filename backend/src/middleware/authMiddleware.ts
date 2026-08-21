import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
  tipo: string;
}

export interface AuthRequest extends Request {
  usuario?: TokenPayload;
}

export function verificarToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "Token não informado" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    req.usuario = decoded;
    next();
  } catch {
    return res.status(401).json({ mensagem: "Token inválido" });
  }
}