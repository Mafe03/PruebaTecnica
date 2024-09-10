import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useLocation } from "react-router-dom";
import google from "../assets/google.png";
import perro from "../assets/perro.png";

const Buscar = () => {
  // Usa el hook useLocation para obtener datos de la ubicación actual
  const location = useLocation();

  // Establece los estados para manejar los datos de búsqueda y el modal
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalURL, setModalURL] = useState("");

  // Obtiene los datos de búsqueda iniciales de la ubicación
  const busc = location.state?.busc || [];
  const textoBusquedaInicial = location.state?.textoBusqueda || "";

  // Se ejecuta cambian los datos de búsqueda
  useEffect(() => {
    setResultados(busc);
    setTextoBusqueda(textoBusquedaInicial);
  }, [busc, textoBusquedaInicial]);

  // Función para manejar la búsqueda de animales
  const Busqueda = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      const request = await fetch(
        `http://localhost:3600/busuqeda/listarAnimal/${textoBusqueda}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await request.json();
      setResultados(data.mensaje); // Actualiza los resultados de búsqueda
    } catch (error) {
      console.error("Error en la solicitud:", error); // Muestra errores en la consola
    }
  };

  // Función para manejar el clic en un enlace de animal
  const handleLinkClick = (e, animal) => {
    e.preventDefault(); // Evita que el enlace navegue a otra página
    setModalTitle(animal.nombreAnimal); // Establece el título del modal
    setModalURL(animal.urlAnimal); // Establece la URL del modal
    setModalShow(true); // Muestra el modal
  };

  return (
    <>
      {/* Barra de navegación superior */}
      <Navbar style={{ background: "#dce0e6" }}>
        <Container>
          <img src={google} alt="" style={{ height: "30px", width: "auto" }} />
          <div className="col-4 m-1">
            <Form onSubmit={Busqueda}>
              <Form.Group
                className="mb-4 mt-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  onChange={(e) => setTextoBusqueda(e.target.value)}
                  value={textoBusqueda}
                  style={{ borderRadius: "20px" }}
                />
              </Form.Group>
            </Form>
          </div>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text></Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenedor principal de los resultados */}
      <Container>
        <div className="row mt-4">
          <div className="col-7">
            {resultados.length > 0 ? (
              resultados.map((animal) => (
                <div key={animal.id} className="mb-3">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={(e) => handleLinkClick(e, animal)}
                  >
                    <h5>{animal.nombreAnimal}</h5>
                  </button>
                  <p className="ms-3">{animal.descripcionAnimal}</p>
                  <button
                    type="button"
                    className="btn btn-link d-block"
                    onClick={(e) => handleLinkClick(e, animal)}
                  >
                    {animal.urlAnimal}
                  </button>
                </div>
              ))
            ) : (
              <p>No se encontraron resultados.</p>
            )}
          </div>
          <div className="col-1 d-flex align-items-center">
            <hr style={{ height: "100%", border: "1px solid black" }} />
          </div>
          <div className="col-4">
            {resultados.length > 0 ? (
              resultados.map((animal) => (
                <Card
                  key={animal.id}
                  style={{
                    width: "25rem",
                    border: "none",
                    marginBottom: "1rem",
                  }}
                >
                  <Card.Img variant="top" src={perro} />
                  <Card.Body>
                    <Card.Title>{animal.nombreAnimal}</Card.Title>
                    <Card.Text>{animal.descripcionAnimal}</Card.Text>
                    <a
                      href={animal.urlAnimal}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Más información
                    </a>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <Card style={{ width: "25rem", border: "none" }}>
                <Card.Img variant="top" src={perro} />
                <Card.Body>
                  <Card.Title>No hay información</Card.Title>
                  <Card.Text>
                    No se encontraron animales que coincidan con la búsqueda.
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      </Container>

      {/* Modal que se muestra al hacer clic en un enlace */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <iframe
            src={modalURL}
            title={modalTitle}
            style={{ width: "100%", height: "70vh", border: "none" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Buscar;
