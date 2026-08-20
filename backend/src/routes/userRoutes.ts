import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/database";

const router = Router();

// ==========================================
// CADASTRAR USUÁRIO
// ==========================================

router.post("/usuarios", async (req, res) => {
    try {
        const {
            nome_Usuario,
            cpf_Usuario,
            email_Usuario,
            senha_Usuario,
        } = req.body;

        if (
            !nome_Usuario ||
            !cpf_Usuario ||
            !email_Usuario ||
            !senha_Usuario
        ) {
            return res.status(400).json({
                mensagem:
                    "Nome, CPF, e-mail e senha são obrigatórios",
            });
        }

        const senhaHash = await bcrypt.hash(
            senha_Usuario,
            10
        );

        const resultado = await pool.query(
            `
            INSERT INTO usuarios (
                nome_usuario,
                cpf_usuario,
                email_usuario,
                senha_usuario
            )
            VALUES ($1, $2, $3, $4)
            RETURNING
                id_usuario AS "id_Usuario",
                nome_usuario AS "nome_Usuario",
                cpf_usuario AS "cpf_Usuario",
                email_usuario AS "email_Usuario"
            `,
            [
                nome_Usuario,
                cpf_Usuario,
                email_Usuario,
                senhaHash,
            ]
        );

        return res.status(201).json(
            resultado.rows[0]
        );

    } catch (error) {
        console.error(
            "Erro ao cadastrar usuário:",
            error
        );

        return res.status(500).json({
            mensagem: "Erro ao cadastrar usuário",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

// ==========================================
// LISTAR USUÁRIOS
// ==========================================

router.get("/usuarios", async (_req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                id_usuario AS "id_Usuario",
                nome_usuario AS "nome_Usuario",
                cpf_usuario AS "cpf_Usuario",
                email_usuario AS "email_Usuario"
            FROM usuarios
            ORDER BY id_usuario
        `);

        return res.status(200).json(
            resultado.rows
        );

    } catch (error) {
        console.error(
            "Erro ao buscar usuários:",
            error
        );

        return res.status(500).json({
            mensagem: "Erro ao buscar usuários",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

// ==========================================
// BUSCAR USUÁRIO POR ID
// ==========================================

router.get("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `
            SELECT
                id_usuario AS "id_Usuario",
                nome_usuario AS "nome_Usuario",
                cpf_usuario AS "cpf_Usuario",
                email_usuario AS "email_Usuario"
            FROM usuarios
            WHERE id_usuario = $1
            `,
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem:
                    "Usuário não encontrado",
            });
        }

        return res.status(200).json(
            resultado.rows[0]
        );

    } catch (error) {
        console.error(
            "Erro ao buscar usuário:",
            error
        );

        return res.status(500).json({
            mensagem: "Erro ao buscar usuário",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

// ==========================================
// EDITAR USUÁRIO
// ==========================================

router.put("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nome_Usuario,
            cpf_Usuario,
            email_Usuario,
            senha_Usuario,
        } = req.body;

        if (
            !nome_Usuario ||
            !cpf_Usuario ||
            !email_Usuario
        ) {
            return res.status(400).json({
                mensagem:
                    "Nome, CPF e e-mail são obrigatórios",
            });
        }

        let resultado;

        // ======================================
        // COM NOVA SENHA
        // ======================================

        if (senha_Usuario) {
            const senhaHash = await bcrypt.hash(
                senha_Usuario,
                10
            );

            resultado = await pool.query(
                `
                UPDATE usuarios
                SET
                    nome_usuario = $1,
                    cpf_usuario = $2,
                    email_usuario = $3,
                    senha_usuario = $4
                WHERE id_usuario = $5
                RETURNING
                    id_usuario AS "id_Usuario",
                    nome_usuario AS "nome_Usuario",
                    cpf_usuario AS "cpf_Usuario",
                    email_usuario AS "email_Usuario"
                `,
                [
                    nome_Usuario,
                    cpf_Usuario,
                    email_Usuario,
                    senhaHash,
                    id,
                ]
            );

        } else {

            // ==================================
            // SEM ALTERAR SENHA
            // ==================================

            resultado = await pool.query(
                `
                UPDATE usuarios
                SET
                    nome_usuario = $1,
                    cpf_usuario = $2,
                    email_usuario = $3
                WHERE id_usuario = $4
                RETURNING
                    id_usuario AS "id_Usuario",
                    nome_usuario AS "nome_Usuario",
                    cpf_usuario AS "cpf_Usuario",
                    email_usuario AS "email_Usuario"
                `,
                [
                    nome_Usuario,
                    cpf_Usuario,
                    email_Usuario,
                    id,
                ]
            );
        }

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem:
                    "Usuário não encontrado",
            });
        }

        return res.status(200).json(
            resultado.rows[0]
        );

    } catch (error) {
        console.error(
            "Erro ao atualizar usuário:",
            error
        );

        return res.status(500).json({
            mensagem:
                "Erro ao atualizar usuário",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

// ==========================================
// EXCLUIR USUÁRIO
// ==========================================

router.delete("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `
            DELETE FROM usuarios
            WHERE id_usuario = $1
            RETURNING id_usuario
            `,
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem:
                    "Usuário não encontrado",
            });
        }

        return res.status(200).json({
            mensagem:
                "Usuário excluído com sucesso",
        });

    } catch (error) {
        console.error(
            "Erro ao excluir usuário:",
            error
        );

        return res.status(500).json({
            mensagem:
                "Erro ao excluir usuário",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

export default router;