import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/database";
import { verificarToken } from "../middleware/authMiddleware";
import { somenteAdmin } from "../middleware/adminMiddleware";

const router = Router();

router.post("/usuarios", async (req, res) => {
  try {
    const { nome_Usuario, cpf_Usuario, email_Usuario, senha_Usuario } = req.body;

    if (!nome_Usuario || !cpf_Usuario || !email_Usuario || !senha_Usuario) {
      return res.status(400).json({
        mensagem: "Nome, CPF, e-mail e senha são obrigatórios",
      });
    }

    const emailExiste = await pool.query(
      "SELECT id_usuario FROM usuarios WHERE email_usuario = $1",
      [email_Usuario]
    );

    if (emailExiste.rowCount && emailExiste.rowCount > 0) {
      return res.status(409).json({
        mensagem: "Este e-mail já está cadastrado",
      });
    }

    const senhaHash = await bcrypt.hash(senha_Usuario, 10);

    const resultado = await pool.query(
      `
      INSERT INTO usuarios (
        nome_usuario,
        cpf_usuario,
        email_usuario,
        senha_usuario,
        tipo_usuario
      )
      VALUES ($1, $2, $3, $4, 'usuario')
      RETURNING
        id_usuario AS "id_Usuario",
        nome_usuario AS "nome_Usuario",
        cpf_usuario AS "cpf_Usuario",
        email_usuario AS "email_Usuario",
        tipo_usuario AS "tipo_Usuario"
      `,
      [nome_Usuario, cpf_Usuario, email_Usuario, senhaHash]
    );

    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return res.status(500).json({
      mensagem: "Erro ao cadastrar usuário",
    });
  }
});

router.get("/usuarios", verificarToken, somenteAdmin, async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT
        id_usuario AS "id_Usuario",
        nome_usuario AS "nome_Usuario",
        cpf_usuario AS "cpf_Usuario",
        email_usuario AS "email_Usuario",
        tipo_usuario AS "tipo_Usuario"
      FROM usuarios
      ORDER BY id_usuario
    `);

    return res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensagem: "Erro ao buscar usuários",
    });
  }
});

router.get("/usuarios/:id", verificarToken, somenteAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      `
      SELECT
        id_usuario AS "id_Usuario",
        nome_usuario AS "nome_Usuario",
        cpf_usuario AS "cpf_Usuario",
        email_usuario AS "email_Usuario",
        tipo_usuario AS "tipo_Usuario"
      FROM usuarios
      WHERE id_usuario = $1
      `,
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    return res.json(resultado.rows[0]);
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao buscar usuário",
    });
  }
});

router.put("/usuarios/:id", verificarToken, somenteAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_Usuario, cpf_Usuario, email_Usuario, senha_Usuario, tipo_Usuario } = req.body;

    if (!nome_Usuario || !cpf_Usuario || !email_Usuario) {
      return res.status(400).json({
        mensagem: "Nome, CPF e email são obrigatórios",
      });
    }

    let resultado;

    if (senha_Usuario) {
      const senhaHash = await bcrypt.hash(senha_Usuario, 10);

      resultado = await pool.query(
        `
        UPDATE usuarios SET
          nome_usuario = $1,
          cpf_usuario = $2,
          email_usuario = $3,
          senha_usuario = $4,
          tipo_usuario = COALESCE($5, tipo_usuario)
        WHERE id_usuario = $6
        RETURNING
          id_usuario AS "id_Usuario",
          nome_usuario AS "nome_Usuario",
          cpf_usuario AS "cpf_Usuario",
          email_usuario AS "email_Usuario",
          tipo_usuario AS "tipo_Usuario"
        `,
        [nome_Usuario, cpf_Usuario, email_Usuario, senhaHash, tipo_Usuario || null, id]
      );
    } else {
      resultado = await pool.query(
        `
        UPDATE usuarios SET
          nome_usuario = $1,
          cpf_usuario = $2,
          email_usuario = $3,
          tipo_usuario = COALESCE($4, tipo_usuario)
        WHERE id_usuario = $5
        RETURNING
          id_usuario AS "id_Usuario",
          nome_usuario AS "nome_Usuario",
          cpf_usuario AS "cpf_Usuario",
          email_usuario AS "email_Usuario",
          tipo_usuario AS "tipo_Usuario"
        `,
        [nome_Usuario, cpf_Usuario, email_Usuario, tipo_Usuario || null, id]
      );
    }

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    return res.json(resultado.rows[0]);
  } catch (error) {
    console.error("ERRO UPDATE USUARIO:", error);
    return res.status(500).json({
      mensagem: "Erro ao atualizar usuário",
    });
  }
});

router.delete("/usuarios/:id", verificarToken, somenteAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      "DELETE FROM usuarios WHERE id_usuario = $1 RETURNING id_usuario",
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        mensagem: "Usuário não encontrado",
      });
    }

    return res.json({
      mensagem: "Usuário excluído com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      mensagem: "Erro ao excluir usuário",
    });
  }
});

export default router;