import express from "express";
import clienteRoutes from "./Routes/clienteRoutes.js";
import sequelize from "./config/clienteConfig.js";

const app = express();
app.use(express.json());
app.use("/api/cuota", clienteRoutes);

app.get("/", (req, res) => {
  res.send("API Cuotas activa. Usa /api/cuota en Postman.");
});

const PORT = process.env.PORT || 3000;

// Iniciar: autenticar y sincronizar Sequelize antes de levantar el servidor
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");
    // sincroniza tablas (no force por seguridad)
    await sequelize.sync();
    app.listen(PORT, () => console.log("Servidor ejecutandose en puerto " + PORT));
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
    process.exit(1);
  }
})();
