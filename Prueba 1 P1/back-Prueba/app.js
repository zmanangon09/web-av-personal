import express from "express";
import clienteRoutes from "./Routes/clienteRoutes.js";

const app = express();
app.use(express.json());
app.use("/api/cuota", clienteRoutes);

app.get("/", (req, res) => {
  res.send("API Cuotas activa. Usa /api/cuota en Postman.");
});

const PORT = 3000;
app.listen(PORT, () => console.log("Servidor ejecutandose en puerto " + PORT));
