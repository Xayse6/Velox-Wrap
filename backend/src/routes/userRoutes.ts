import { Router } from "express";
import { pool } from "../config/database";

const router = Router();

router.get("/usuarios", async (_req, res) => {
    try {
        const resultado = await pool.query(
            "SELECT id, nome, email FROM usuarios"
        );

        res.status(200).json(resultado.rows);
    } catch (error) {
    console.error("Erro ao buscar usuários:", error);

    res.status(500).json({
        mensagem: "Erro ao buscar usuários",
        erro: error instanceof Error ? error.message : error,
    });
}
});

export default router;