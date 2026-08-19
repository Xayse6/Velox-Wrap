import { Router } from "express";
import { pool } from "../config/database";

const router = Router();

router.post("/usuarios", async (req, res) => {
    try {
        const { nome, cpf } = req.body;

        if (!nome || !cpf) {
            return res.status(400).json({
                mensagem: "Nome e CPF são obrigatórios"
            });
        }

        const resultado = await pool.query(
            `
            INSERT INTO usuario (nome, cpf)
            VALUES ($1, $2)
            RETURNING
                id AS "idUsuario",
                nome,
                cpf
            `,
            [nome, cpf]
        );

        return res.status(201).json(resultado.rows[0]);

    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar usuário",
            erro: error instanceof Error
                ? error.message
                : error,
        });
    }
});

router.get("/usuarios", async (_req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                id AS "idUsuario",
                nome,
                cpf
            FROM usuario
            ORDER BY id
        `);

        return res.status(200).json(resultado.rows);

    } catch (error) {
        console.error("Erro ao buscar usuários:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar usuários",
            erro: error instanceof Error
                ? error.message
                : error,
        });
    }
});

router.delete("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            "DELETE FROM usuario WHERE id = $1 RETURNING id",
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        return res.status(200).json({
            mensagem: "Usuário excluído com sucesso"
        });

    } catch (error) {
        console.error("Erro ao excluir usuário:", error);

        return res.status(500).json({
            mensagem: "Erro ao excluir usuário",
            erro: error instanceof Error
                ? error.message
                : error,
        });
    }
});

export default router;