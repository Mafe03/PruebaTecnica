const { busqueda, sequelize } = require("../model/Conexion");
const { QueryTypes } = require("sequelize");

//Funcion que filtra la busqueda de los animales
const ListarAnimal = async (req, res) => {
  try {
    const animal = await sequelize.query(
      `SELECT "nombreAnimal", "descripcionAnimal", "urlAnimal"
	FROM public."ANIMALES" WHERE "nombreAnimal" ILIKE '%${req.params.id}%' `,
      { type: QueryTypes.SELECT }
    );
    res.send({ id: 200, mensaje: animal });
  } catch (error) {
    res.send({ id: 400, mensaje: error.message });
  }
};

module.exports = {
  ListarAnimal,
};
