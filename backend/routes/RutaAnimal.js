const express = require("express");
const router = express.Router();
const anumalController = require("../controller/buscar");

router.get("/busuqeda/listarAnimal/:id", anumalController.ListarAnimal);

module.exports = router;
