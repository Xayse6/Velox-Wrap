import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/database";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        mensagem: "Email e senha obrigatórios",
      });
    }

    const resultado = await pool.query(
      `
      SELECT
        id_usuario,
        nome_usuario,
        email_usuario,
        senha_usuario,
        tipo_usuario
      FROM usuarios
      WHERE email_usuario = $1
      `,
      [email]
    );

    if (resultado.rowCount === 0) {
      return res.status(401).json({
        mensagem: "Email ou senha inválidos",
      });
    }

    const usuario = resultado.rows[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha_usuario);

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "Email ou senha inválidos",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id_usuario,
        email: usuario.email_usuario,
        tipo: usuario.tipo_usuario,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    return res.json({
      mensagem: "Login realizado",
      token,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome_usuario,
        email: usuario.email_usuario,
        tipo: usuario.tipo_usuario,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensagem: "Erro no servidor",
    });
  }
});

export default router;