import React from "react";
import { Route, Routes } from "react-router-dom";
import Body from "../components/body";
import Footer from "../components/footer";
import Header from "../components/header";
import Leccion from "../components/lecciones";
import Login from "../components/login";
import Modulos from "../components/modulos";
import Nosotros from "../components/nosotros";
import Register from "../components/register";


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
          <Route path="/register" element={<Register />} />
        </Routes>

      <Footer />
    </div>
  );
}

export default Pages;
