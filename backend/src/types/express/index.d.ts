import { UsuarioToken } from "../../middleware/authMiddleware";


declare global {

    namespace Express {

        interface Request {

            usuario: UsuarioToken;

        }

    }

}


export {};