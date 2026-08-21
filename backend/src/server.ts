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

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", marcaRoutes);
app.use("/api", modeloRoutes);
app.use("/api", veiculoRoutes);

app.use(
  (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({
      mensagem: "Erro interno do servidor",
    });
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});