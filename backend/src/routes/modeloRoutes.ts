import { Router } from "express";

import { pool } from "../config/database";

const router = Router();

// =========================================================
// MODELOS
// =========================================================

// LISTAR MODELOS
router.get("/modelos", async (_req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                mo.id_modelo AS "id_Modelo",
                mo.nome_modelo AS "nome_Modelo",
                mo.ano_modelo AS "ano_Modelo",
                mo.id_marca AS "id_Marca",
                ma.nome_marca AS "nome_Marca",
                ma.sigla_marca AS "sigla_Marca"
            FROM modelos mo
            INNER JOIN marcas ma
                ON ma.id_marca = mo.id_marca
            ORDER BY mo.id_modelo
        `);

        return res.status(200).json(resultado.rows);

    } catch (error) {
        console.error("Erro ao buscar modelos:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar modelos",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});


// BUSCAR MODELO POR ID
router.get("/modelos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            SELECT
                mo.id_modelo AS "id_Modelo",
                mo.nome_modelo AS "nome_Modelo",
                mo.ano_modelo AS "ano_Modelo",
                mo.id_marca AS "id_Marca",
                ma.nome_marca AS "nome_Marca",
                ma.sigla_marca AS "sigla_Marca"
            FROM modelos mo
            INNER JOIN marcas ma
                ON ma.id_marca = mo.id_marca
            WHERE mo.id_modelo = $1
        `, [id]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Modelo não encontrado",
            });
        }

        return res.status(200).json(
            resultado.rows[0]
        );

    } catch (error) {
        console.error("Erro ao buscar modelo:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar modelo",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});


// CADASTRAR MODELO
router.post("/modelos", async (req, res) => {
    try {
        const {
            nome_modelo,
            ano_modelo,
            id_marca,
        } = req.body;

        if (
            !nome_modelo ||
            !ano_modelo ||
            !id_marca
        ) {
            return res.status(400).json({
                mensagem:
                    "Nome, ano e marca são obrigatórios",
            });
        }

        const resultado = await pool.query(`
            INSERT INTO modelos (
                nome_modelo,
                ano_modelo,
                id_marca
            )
            VALUES ($1, $2, $3)
            RETURNING
                id_modelo AS "id_Modelo",
                nome_modelo AS "nome_Modelo",
                ano_modelo AS "ano_Modelo",
                id_marca AS "id_Marca"
        `, [
            nome_modelo,
            ano_modelo,
            id_marca,
        ]);

        return res.status(201).json(
            resultado.rows[0]
        );

    } catch (error) {
        console.error("Erro ao cadastrar modelo:", error);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar modelo",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});


// EDITAR MODELO
router.put("/modelos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nome_modelo,
            ano_modelo,
            id_marca,
        } = req.body;

        if (
            !nome_modelo ||
            !ano_modelo ||
            !id_marca
        ) {
            return res.status(400).json({
                mensagem:
                    "Nome, ano e marca são obrigatórios",
            });
        }

        const resultado = await pool.query(`
            UPDATE modelos
            SET
                nome_modelo = $1,
                ano_modelo = $2,
                id_marca = $3
            WHERE id_modelo = $4
            RETURNING
                id_modelo AS "id_Modelo",
                nome_modelo AS "nome_Modelo",
                ano_modelo AS "ano_Modelo",
                id_marca AS "id_Marca"
        `, [
            nome_modelo,
            ano_modelo,
            id_marca,
            id,
        ]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Modelo não encontrado",
            });
        }

        return res.status(200).json(
            resultado.rows[0]
        );

    } catch (error) {
        console.error("Erro ao atualizar modelo:", error);

        return res.status(500).json({
            mensagem: "Erro ao atualizar modelo",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});


// EXCLUIR MODELO
router.delete("/modelos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(`
            DELETE FROM modelos
            WHERE id_modelo = $1
            RETURNING id_modelo
        `, [id]);

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Modelo não encontrado",
            });
        }

        return res.status(200).json({
            mensagem: "Modelo excluído com sucesso",
        });

    } catch (error) {
        console.error("Erro ao excluir modelo:", error);

        return res.status(500).json({
            mensagem: "Erro ao excluir modelo",
            erro:
                error instanceof Error
                    ? error.message
                    : String(error),
        });
    }
});

export default router;