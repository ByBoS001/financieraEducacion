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
import ProtectedRoute from "../components/protectedRoute"; // Asegúrate de que la ruta sea correcta
import { isAuthenticated } from "../utils/auth"; // Asegúrate de que la ruta sea correcta
import UserProfile from "../components/perfil"; 
const Pages = () => {
  const authStatus = isAuthenticated(); // Verificar el estado de autenticación

  return (
    <div style={{width:'100%', height:'100%'}}>
      <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/modulos" element={<Modulos />} />
          <Route 
            path="/leccion" 
            element={
              <ProtectedRoute isAuthenticated={authStatus}>
                <Leccion />
              </ProtectedRoute>
            } 
          />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<UserProfile />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default Pages;

