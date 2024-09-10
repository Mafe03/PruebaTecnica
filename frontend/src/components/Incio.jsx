import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Google from "../assets/descarga.png";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  // Este hook permite cambiar la ruta en la que está el usuario
  const navigate = useNavigate();

  // Este hook guarda el texto de búsqueda que el usuario escribe
  const [datos, setDatos] = useState("");

  // Función que se ejecuta cuando el usuario envía el formulario de búsqueda
  const Busqueda = async (e) => {
    e.preventDefault(); // Previene que la página se recargue al enviar el formulario
    try {
      // Hace una solicitud al servidor para buscar los animales
      const request = await fetch(
        `http://localhost:3600/busuqeda/listarAnimal/${datos}`, // URL para obtener los resultados de la búsqueda
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Convierte la respuesta del servidor en formato JSON
      const data = await request.json();
      console.log(data); // Muestra los resultados en la consola para ver qué se obtuvo

      // Cambia a la página de búsqueda y pasa los datos obtenidos y el texto de búsqueda
      navigate("/Buscar", {
        state: { busc: data.mensaje, textoBusqueda: datos },
      });
    } catch (error) {
      console.error("Error en la solicitud:", error); // Muestra un mensaje de error si algo sale mal
    }
  };

  return (
    <>
      {/* Barra de navegación en la parte superior */}
      <Navbar className="bg-gray">
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Buscador de: <a href="#login">Mafecita</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr />
      {/* Contenedor principal para el formulario de búsqueda */}
      <div
        className="rows d-flex justify-content-center"
        style={{ marginTop: "8%" }}
      >
        <div className="col-4">
          <img
            src={Google}
            alt="Google"
            style={{ display: "block", margin: "auto" }}
          />{" "}
          {/* Imagen que se muestra arriba del formulario */}
          <Form onSubmit={Busqueda}>
            {/* Formulario de búsqueda */}
            <Form.Group
              className="mb-4 mt-3"
              controlId="exampleForm.ControlInput1"
            >
              <InputGroup>
                <InputGroup.Text id="btnGroupAddon">
                  <i className="bi bi-search"></i> {/* Icono de búsqueda */}
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Buscar en Google" // Texto que aparece dentro del campo de entrada
                  aria-label="Buscar en Google" // Descripción para accesibilidad
                  aria-describedby="btnGroupAddon" // Descripción para accesibilidad
                  onChange={(e) => setDatos(e.target.value)} // Actualiza el estado con el texto que el usuario escribe
                  value={datos} // Muestra el texto actual en el campo de entrada
                />
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      </div>

      {/* Pie de página al final de la página */}
      <footer
        className="text-black text-center"
        style={{ marginTop: "18%", background: "#EAEAEA" }}
      >
        <hr />
        <Container>
          <p>
            Colombia 660004, Pereira, Risaralda - A través de tu dirección IP -
            Actualizar ubicación{" "}
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Inicio;
