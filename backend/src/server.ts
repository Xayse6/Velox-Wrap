import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);

app.get("/", (_req, res) => {
    res.json({
        mensagem: "API Velox-Wrap funcionando!",
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});