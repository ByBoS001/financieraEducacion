import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Body from "../components/body";
import Modulos from "../components/modulos"
import Leccion from "../components/lecciones"

const Pages = () => {
  return (
    <div>
      <Header />

        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/modulos" element={<Modulos />} />
          <Route path="/lecciones/:moduloId" element={<Leccion />} />
        </Routes>

      <Footer />
    </div>
  );
}

export default Pages;
