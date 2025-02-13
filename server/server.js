const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json()); // Permitir datos en formato JSON
app.use(cors()); // Habilitar conexiones desde otros servidores

const DATA_FILE = "/data/storage.json"; // Archivo en el volumen persistente

// Verifica si el archivo existe, si no, créalo con un array vacío
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Ruta para obtener los datos
app.get("/api/data", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  res.json(data);
});

// Ruta para guardar datos
app.post("/api/data", (req, res) => {
  const newData = req.body;
  let data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  data.push(newData);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  
  res.json({ message: "Data saved successfully!" });
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => console.log("Backend running on port 5000"));