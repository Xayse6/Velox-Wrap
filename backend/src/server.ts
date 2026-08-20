import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes";
import marcaRoutes from "./routes/marcaRoutes";
import modeloRoutes from "./routes/modeloRoutes";
import veiculoRoutes from "./routes/veiculoRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", marcaRoutes);
app.use("/api", modeloRoutes);
app.use("/api", veiculoRoutes);

app.get("/", (_req, res) => {
    res.json({
        mensagem: "API funcionando!"
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});