import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface UsuarioToken {
    id: number;
    email: string;
    tipo: string;
}


export function verificarToken(
    req: Request,
    res: Response,
    next: NextFunction
) {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).json({
            mensagem: "Token não informado"
        });
    }


    const token = authHeader.split(" ")[1];


    try {

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as UsuarioToken;


        req.usuario = usuario;


        next();


    } catch(error) {

        return res.status(401).json({
            mensagem:"Token inválido"
        });

    }

}