import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import FormularioLogin from "../components/login/FormularioLogin";
import "../app.css";

const Login = () => {

  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);

  const navegar = useNavigate();

  const iniciarSesion = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/verificarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: usuario,
          contrasena: contrasena
        }),
      });

      const datos = await respuesta.json();

      if (datos) {
        console.log("Usuario verificado correctamente");
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("contrasena", contrasena);
        navegar("/inicio");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      console.error("Error en la solicitud:", error);
    }
  };

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    const contrasenaGuardada = localStorage.getItem("contrasena");
    if (usuarioGuardado && contrasenaGuardada) {
      navegar("/inicio");
    }
  }, [navegar]);

  return (
    <Container className="d-flex vh-100 justify-content-center align-items-center">
      <FormularioLogin
        usuario={usuario}
        contrasena={contrasena}
        error={error}
        setUsuario={setUsuario}
        setContrasena={setContrasena}
        iniciarSesion={iniciarSesion}
      />
    </Container>
  );
};

export default Login;