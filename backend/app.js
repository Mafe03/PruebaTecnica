const express = require("express");
const cors = require("cors");

const RutaAnimales = require("./routes/RutaAnimal");

const app = express();
require("./model/Conexion");
const puerto = 3600;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", RutaAnimales);

app.listen(puerto, () => {
  console.log("Aplicacion ejecutandose en : http://localhost:3600");
});
