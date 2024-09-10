const { Sequelize } = require("sequelize");

// Importar modelos
const animal = require("./Busqueda");

// Configuración de la base de datos
const dbConfig = {
  database: "PruebaTecnica",
  username: "postgres",
  password: "12345",
  host: "localhost",
  dialect: "postgres",
};

// Crear instancia de Sequelize con la configuración
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const busqueda = animal(sequelize, Sequelize);

// Función que sincroniza la base de datos con los modelos instanciados
sequelize.sync({ force: false }).then(() => {
  console.log("Base de datos sincronizada");
});

module.exports = {
  busqueda,
  sequelize,
};
