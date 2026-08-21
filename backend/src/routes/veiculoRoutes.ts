import { Router } from "express";
import { pool } from "../config/database";

const router = Router();

router.get("/veiculos", async (_req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT
        v.id_veiculo AS "id_Veiculo",
        v.id_usuario AS "id_Usuario",
        v.id_modelo AS "id_Modelo",
        u.nome_usuario AS "nome_Usuario",
        mo.nome_modelo AS "nome_Modelo",
        mo.ano_modelo AS "ano_Modelo",
        ma.id_marca AS "id_Marca",
        ma.nome_marca AS "nome_Marca",
        ma.sigla_marca AS "sigla_Marca"
      FROM veiculos v
      INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
      INNER JOIN modelos mo ON v.id_modelo = mo.id_modelo
      INNER JOIN marcas ma ON mo.id_marca = ma.id_marca
      ORDER BY v.id_veiculo
    `);

    return res.status(200).json(resultado.rows);
  } catch (error) {
    console.error("ERRO AO BUSCAR VEÍCULOS");
    console.error(error);
    return res.status(500).json({
      mensagem: "Erro ao buscar veículos",
    });
  }
});

router.get("/veiculos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const resultado = await pool.query(
      `
      SELECT
        v.id_veiculo AS "id_Veiculo",
        v.id_usuario AS "id_Usuario",
        v.id_modelo AS "id_Modelo",
        u.nome_usuario AS "nome_Usuario",
        mo.nome_modelo AS "nome_Modelo",
        mo.ano_modelo AS "ano_Modelo",
        ma.id_marca AS "id_Marca",
        ma.nome_marca AS "nome_Marca",
        ma.sigla_marca AS "sigla_Marca"
      FROM veiculos v
      INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
      INNER JOIN modelos mo ON v.id_modelo = mo.id_modelo
      INNER JOIN marcas ma ON mo.id_marca = ma.id_marca
      WHERE v.id_veiculo = $1
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Veículo não encontrado",
      });
    }

    return res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensagem: "Erro ao buscar veículo",
    });
  }
});

router.post("/veiculos", async (req, res) => {
  try {
    const { id_Usuario, id_Modelo } = req.body;

    const resultado = await pool.query(
      `
      INSERT INTO veiculos (id_usuario, id_modelo)
      VALUES ($1, $2)
      RETURNING
        id_veiculo AS "id_Veiculo",
        id_usuario AS "id_Usuario",
        id_modelo AS "id_Modelo"
      `,
      [id_Usuario, id_Modelo]
    );

    return res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensagem: "Erro ao cadastrar veículo",
    });
  }
});

router.put("/veiculos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { id_Usuario, id_Modelo } = req.body;

    const resultado = await pool.query(
      `
      UPDATE veiculos
      SET
        id_usuario = $1,
        id_modelo = $2
      WHERE id_veiculo = $3
      RETURNING
        id_veiculo AS "id_Veiculo",
        id_usuario AS "id_Usuario",
        id_modelo AS "id_Modelo"
      `,
      [id_Usuario, id_Modelo, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Veículo não encontrado",
      });
    }

    return res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensagem: "Erro ao atualizar veículo",
    });
  }
});

router.delete("/veiculos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const resultado = await pool.query(
      `
      DELETE FROM veiculos
      WHERE id_veiculo = $1
      RETURNING id_veiculo
      `,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({
        mensagem: "Veículo não encontrado",
      });
    }

    return res.json({
      mensagem: "Veículo excluído com sucesso",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensagem: "Erro ao excluir veículo",
    });
  }
});

export default router;