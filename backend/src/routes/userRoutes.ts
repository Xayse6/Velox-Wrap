import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/database";

const router = Router();

router.post("/usuarios", async (req, res) => {
    try {
        const { nome, cpf, email, senha } = req.body;

        if (!nome || !cpf || !email || !senha) {
            return res.status(400).json({
                mensagem: "Nome, CPF, e-mail e senha são obrigatórios"
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const resultado = await pool.query(
            `
            INSERT INTO usuarios (nome, cpf, email, senha)
            VALUES ($1, $2, $3, $4)
            RETURNING
                idUsuario,
                nome,
                cpf,
                email
            `,
            [nome, cpf, email, senhaHash]
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
                idUsuario,
                nome,
                cpf,
                email
            FROM usuarios
            ORDER BY idUsuario
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

router.get("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `
            SELECT
                idUsuario,
                nome,
                cpf,
                email
            FROM usuarios
            WHERE idUsuario = $1
            `,
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        return res.status(200).json(resultado.rows[0]);

    } catch (error) {
        console.error("Erro ao buscar usuário:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar usuário",
            erro: error instanceof Error
                ? error.message
                : error,
        });
    }
});


router.put("/usuarios/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, cpf, email, senha } = req.body;

        if (!nome || !cpf || !email) {
            return res.status(400).json({
                mensagem: "Nome, CPF e e-mail são obrigatórios"
            });
        }

        let resultado;

        if (senha) {
            const senhaHash = await bcrypt.hash(senha, 10);

            resultado = await pool.query(
                `
                UPDATE usuarios
                SET
                    nome = $1,
                    cpf = $2,
                    email = $3,
                    senha = $4
                WHERE idUsuario = $5
                RETURNING
                    idUsuario,
                    nome,
                    cpf,
                    email
                `,
                [nome, cpf, email, senhaHash, id]
            );
        } else {
            resultado = await pool.query(
                `
                UPDATE usuarios
                SET
                    nome = $1,
                    cpf = $2,
                    email = $3
                WHERE idUsuario = $4
                RETURNING
                    idUsuario,
                    nome,
                    cpf,
                    email
                `,
                [nome, cpf, email, id]
            );
        }

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        return res.status(200).json({
            mensagem: "Usuário atualizado com sucesso",
            usuario: resultado.rows[0]
        });

    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);

        return res.status(500).json({
            mensagem: "Erro ao atualizar usuário",
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
            "DELETE FROM usuarios WHERE idUsuario = $1 RETURNING idUsuario",
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