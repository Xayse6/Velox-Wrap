import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import marcaRoutes from "./routes/marcaRoutes";
import modeloRoutes from "./routes/modeloRoutes";
import veiculoRoutes from "./routes/veiculoRoutes";
import authRoutes from "./routes/authRoutes";


dotenv.config();


const app = express();


app.use(
    cors({
        origin: "*",
        methods:[
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        allowedHeaders:[
            "Content-Type",
            "Authorization"
        ]
    })
);


app.use(express.json());



// LOGIN
app.use("/api", authRoutes);


// USUARIOS
app.use("/api", userRoutes);


// MARCAS
app.use("/api", marcaRoutes);


// MODELOS
app.use("/api", modeloRoutes);


// VEICULOS
app.use("/api", veiculoRoutes);



app.get("/", (_req,res)=>{

    res.json({
        mensagem:
        "API Velox Wrap funcionando!"
    });

});



app.use(
(
err:any,
_req:express.Request,
res:express.Response,
_next:express.NextFunction
)=>{

    console.error(err);

    res.status(500).json({
        mensagem:
        "Erro interno do servidor"
    });

});



const PORT =
process.env.PORT || 3000;


app.listen(
PORT,
()=>{
console.log(
`Servidor rodando em http://localhost:${PORT}`
);
});