import { Router } from "express";
import { pool } from "../config/database";

const router = Router();

/* ============================================================
   LISTAR VEÍCULOS
   ============================================================ */

router.get("/veiculos", async (_req, res) => {
    try {
        const resultado = await pool.query(`
            SELECT
                v.id_Veiculo,
                v.idUsuario,
                v.id_Modelo,

                u.nome AS nome_Usuario,

                mo.nome_Modelo,
                mo.ano_Modelo,

                ma.id_Marca,
                ma.nome_Marca,
                ma.sigla_Marca

            FROM veiculos v

            INNER JOIN usuarios u
                ON v.idUsuario = u.idUsuario

            INNER JOIN modelos mo
                ON v.id_Modelo = mo.id_Modelo

            INNER JOIN marcas ma
                ON mo.id_Marca = ma.id_Marca

            ORDER BY v.id_Veiculo
        `);

        return res.status(200).json(resultado.rows);

    } catch (error) {

        console.error("Erro ao buscar veículos:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar veículos",
            erro: error instanceof Error
                ? error.message
                : String(error),
        });
    }
});


/* ============================================================
   BUSCAR VEÍCULO POR ID
   ============================================================ */

router.get("/veiculos/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const resultado = await pool.query(
            `
            SELECT
                v.id_Veiculo,
                v.idUsuario,
                v.id_Modelo,

                u.nome AS nome_Usuario,

                mo.nome_Modelo,
                mo.ano_Modelo,

                ma.id_Marca,
                ma.nome_Marca,
                ma.sigla_Marca

            FROM veiculos v

            INNER JOIN usuarios u
                ON v.idUsuario = u.idUsuario

            INNER JOIN modelos mo
                ON v.id_Modelo = mo.id_Modelo

            INNER JOIN marcas ma
                ON mo.id_Marca = ma.id_Marca

            WHERE v.id_Veiculo = $1
            `,
            [id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Veículo não encontrado"
            });
        }

        return res.status(200).json(resultado.rows[0]);

    } catch (error) {

        console.error("Erro ao buscar veículo:", error);

        return res.status(500).json({
            mensagem: "Erro ao buscar veículo",
            erro: error instanceof Error
                ? error.message
                : String(error),
        });
    }
});

export default router;