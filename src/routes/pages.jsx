import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Body from "../components/body";
import Modulos from "../components/modulos"
import Leccion from "../components/lecciones"
import Login from "../components/login"
import Nosotros from "../components/nosotros";

const Pages = () => {
  return (
    <div style={{width:'100%', height:'100%'}}>
      <Header />

        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/modulos" element={<Modulos />} />
          <Route path="/leccion" element={<Leccion />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      <Footer />
    </div>
  );
}

export default Pages;
