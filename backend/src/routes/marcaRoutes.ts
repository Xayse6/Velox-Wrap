import { Router } from "express";

import { pool } from "../config/database";

const router = Router();

router.post("/marcas", async (req, res) => {
    try {
        const {
            nome_Marca,
            sigla_Marca,
        } = req.body;

        if (!nome_Marca || !sigla_Marca) {
            return res.status(400).json({
                mensagem:
                    "Nome e sigla da marca são obrigatórios",
            });
        }

        const resultado = await pool.query(
            `
            INSERT INTO marcas (
                nome_marca,
                sigla_marca
            )
            VALUES ($1, $2)
            RETURNING
                id_marca AS "id_Marca",
                nome_marca AS "nome_Marca",
                sigla_marca AS "sigla_Marca"
            `,
            [
                nome_Marca,
                sigla_Marca,
            ]
        );

        return res.status(201).json(
            resultado.rows[0]
        );

    } catch (error) {
        console.error(
            "Erro ao cadastrar marca:",
            error
        );

        return res.status(500).json({
            mensagem: "Erro ao cadastrar marca",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

router.get("/marcas", async (_req, res) => {
    try {
        const resultado = await pool.query(
            `
            SELECT
                id_marca AS "id_Marca",
                nome_marca AS "nome_Marca",
                sigla_marca AS "sigla_Marca"
            FROM marcas
            ORDER BY id_marca
            `
        );

        return res.status(200).json(
            resultado.rows
        );

    } catch (error) {
        console.error(
            "Erro ao buscar marcas:",
            error
        );

        return res.status(500).json({
            mensagem: "Erro ao buscar marcas",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

router.get("/marcas/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `
            SELECT
                id_marca AS "id_Marca",
                nome_marca AS "nome_Marca",
                sigla_marca AS "sigla_Marca"
            FROM marcas
            WHERE id_marca = $1
            `,
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Marca não encontrada",
            });
        }

        return res.status(200).json(
            resultado.rows[0]
        );

    } catch (error) {
        console.error(
            "Erro ao buscar marca:",
            error
        );

        return res.status(500).json({
            mensagem: "Erro ao buscar marca",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

router.put("/marcas/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nome_Marca,
            sigla_Marca,
        } = req.body;

        if (!nome_Marca || !sigla_Marca) {
            return res.status(400).json({
                mensagem:
                    "Nome e sigla são obrigatórios",
            });
        }

        const resultado = await pool.query(
            `
            UPDATE marcas
            SET
                nome_marca = $1,
                sigla_marca = $2
            WHERE id_marca = $3
            RETURNING
                id_marca AS "id_Marca",
                nome_marca AS "nome_Marca",
                sigla_marca AS "sigla_Marca"
            `,
            [
                nome_Marca,
                sigla_Marca,
                id,
            ]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Marca não encontrada",
            });
        }

        return res.status(200).json(
            resultado.rows[0]
        );

    } catch (error) {
        console.error(
            "Erro ao atualizar marca:",
            error
        );

        return res.status(500).json({
            mensagem: "Erro ao atualizar marca",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

router.delete("/marcas/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `
            DELETE FROM marcas
            WHERE id_marca = $1
            RETURNING id_marca
            `,
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Marca não encontrada",
            });
        }

        return res.status(200).json({
            mensagem:
                "Marca excluída com sucesso",
        });

    } catch (error) {
        console.error(
            "Erro ao excluir marca:",
            error
        );

        return res.status(500).json({
            mensagem: "Erro ao excluir marca",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

export default router;