import { Router } from "express";
import { pool } from "../config/database";

const router = Router();

router.get("/marcas", async (_req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                id_Marca,
                nome_Marca,
                sigla_Marca
            FROM marcas ORDER BY id_Marca
        `);

        return res.status(200).json(resultado.rows);

    } catch (error) {
        console.error("Erro ao buscar marcas:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar marcas",
            erro: error instanceof Error
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
                id_Marca,
                nome_Marca,
                sigla_Marca
            FROM marcas WHERE id_Marca = $1`,
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Marca não encontrado"
            });
        }

        return res.status(200).json(resultado.rows[0]);

    } catch (error) {
        console.error("Erro ao buscar marca:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar marca",
            erro: error instanceof Error
                ? error.message
                : error,
        });
    }
});

export default router;