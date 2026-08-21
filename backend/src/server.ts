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


// ===============================
// MIDDLEWARES
// ===============================

app.use(
    cors({
        origin: "*",
        methods: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

app.use(express.json());


// ===============================
// ROTAS
// ===============================

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", marcaRoutes);
app.use("/api", modeloRoutes);
app.use("/api", veiculoRoutes);


// ===============================
// TESTE
// ===============================

app.get("/", (_req, res) => {

    res.json({
        mensagem: "API Velox Wrap funcionando!"
    });

});


// teste de rede
app.get("/teste", (_req, res)=>{

    res.json({
        status:"online",
        servidor:"backend",
        ip:"192.168.1.4"
    });

});


// ===============================
// ERRO GLOBAL
// ===============================

app.use(
    (
        err:any,
        _req:express.Request,
        res:express.Response,
        _next:express.NextFunction
    )=>{

        console.error(err);

        res.status(500).json({
            mensagem:"Erro interno do servidor"
        });

    }
);


// ===============================
// SERVIDOR
// ===============================

const PORT = Number(process.env.PORT) || 3000;


app.listen(
    PORT,
    "0.0.0.0",
    ()=>{

        console.log(
            `Servidor rodando em http://192.168.1.4:${PORT}`
        );

    }
);