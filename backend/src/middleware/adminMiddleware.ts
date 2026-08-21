import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";


export function somenteAdmin(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {

    if (req.usuario?.tipo !== "admin") {

        return res.status(403).json({
            mensagem: "Acesso permitido somente para administradores",
        });

    }

    next();

}