import { Router } from "express";
import { pool } from "../config/database";

const router = Router();

router.get("/modelos", async (_req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                mo.id_Modelo,
                mo.nome_Modelo,
                mo.ano_Modelo,
                mo.id_Marca,
                ma.nome_Marca,
                ma.sigla_Marca
            FROM modelos mo
            INNER JOIN marcas ma
                ON ma.id_Marca = mo.id_Marca
            ORDER BY mo.id_Modelo
        `);

        return res.status(200).json(resultado.rows);

    } catch (error) {
        console.error("Erro ao buscar modelos:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar modelos",
            erro: error instanceof Error
                ? error.message
                : String(error),
        });
    }
});

router.get("/modelos/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await pool.query(
            `
            SELECT
                mo.id_Modelo,
                mo.nome_Modelo,
                mo.ano_Modelo,
                mo.id_Marca,
                ma.nome_Marca,
                ma.sigla_Marca
            FROM modelos mo
            INNER JOIN marcas ma
                ON ma.id_Marca = mo.id_Marca
            WHERE mo.id_Modelo = $1
            `,
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Modelo não encontrado",
            });
        }

        return res.status(200).json(resultado.rows[0]);

    } catch (error) {
        console.error("Erro ao buscar modelo:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar modelo",
            erro: error instanceof Error
                ? error.message
                : String(error),
        });
    }
});

export default router;