import { Router } from "express";

import { pool } from "../config/database";

import { verificarToken } from "../middleware/authMiddleware";


const router = Router();



// LISTAR VEÍCULOS DO USUÁRIO

router.get(
"/veiculos",
verificarToken,
async(req,res)=>{


try {


const idUsuario = req.usuario.id;



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


INNER JOIN usuarios u
ON v.id_usuario = u.id_usuario


INNER JOIN modelos mo
ON v.id_modelo = mo.id_modelo


INNER JOIN marcas ma
ON mo.id_marca = ma.id_marca



WHERE v.id_usuario = $1


ORDER BY v.id_veiculo


`,
[idUsuario]);



return res.json(resultado.rows);



}catch(error){


console.error(error);


return res.status(500).json({

mensagem:"Erro ao buscar veículos"

});


}


});




// BUSCAR UM VEÍCULO

router.get(
"/veiculos/:id",
verificarToken,
async(req,res)=>{


try{


const id = Number(req.params.id);


const resultado = await pool.query(`

SELECT

v.id_veiculo AS "id_Veiculo",

v.id_usuario AS "id_Usuario",

v.id_modelo AS "id_Modelo",

u.nome_usuario AS "nome_Usuario",

mo.nome_modelo AS "nome_Modelo",

mo.ano_modelo AS "ano_Modelo",

ma.nome_marca AS "nome_Marca"


FROM veiculos v


INNER JOIN usuarios u
ON v.id_usuario=u.id_usuario


INNER JOIN modelos mo
ON v.id_modelo=mo.id_modelo


INNER JOIN marcas ma
ON mo.id_marca=ma.id_marca


WHERE 
v.id_veiculo=$1

AND

v.id_usuario=$2


`,
[
id,
req.usuario.id
]);



if(resultado.rowCount===0){

return res.status(404).json({

mensagem:"Veículo não encontrado"

});

}



return res.json(resultado.rows[0]);



}catch(error){

return res.status(500).json({

mensagem:"Erro ao buscar veículo"

});

}


});





// CADASTRAR

router.post(
"/veiculos",
verificarToken,
async(req,res)=>{


try{


const {id_Modelo}=req.body;



const resultado = await pool.query(`

INSERT INTO veiculos

(
id_usuario,
id_modelo
)


VALUES
($1,$2)


RETURNING *

`,
[
req.usuario.id,
id_Modelo
]);



return res.status(201).json(resultado.rows[0]);



}catch(error){

console.error(error);

return res.status(500).json({

mensagem:"Erro ao cadastrar veículo"

});

}


});





// DELETAR


router.delete(
"/veiculos/:id",
verificarToken,
async(req,res)=>{


try{


const id = Number(req.params.id);



const resultado = await pool.query(`

DELETE FROM veiculos

WHERE 

id_veiculo=$1

AND

id_usuario=$2


RETURNING id_veiculo


`,
[
id,
req.usuario.id
]);



if(resultado.rowCount===0){

return res.status(404).json({

mensagem:"Veículo não encontrado"

});

}



return res.json({

mensagem:"Veículo excluído"

});



}catch(error){

return res.status(500).json({

mensagem:"Erro ao excluir veículo"

});

}


});



export default router;