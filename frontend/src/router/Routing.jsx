import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Inicio from "../components/Incio";
import Buscar from "../components/Buscar";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Buscar" element={<Buscar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
