import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TablaClientes from "../components/clientes/TablaClientes";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroCliente from "../components/clientes/ModelRegistroCliente";
import ModalEdicionCliente from "../components/clientes/ModalEdicionCliente";
import ModalEliminacionCliente from "../components/clientes/ModalEliminacionCliente";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Modales
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [mostrarEliminacion, setMostrarEliminacion] = useState(false);

  const [clienteEditar, setClienteEditar] = useState(null);
  const [clienteEliminar, setClienteEliminar] = useState(null);

  const elementosPorPagina = 5;
  const [paginaActual, setPaginaActual] = useState(1);

  // Obtener clientes
  const obtenerClientes = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/clientes");
      if (!res.ok) throw new Error("Error al obtener clientes");
      const datos = await res.json();
      setClientes(datos);
      setClientesFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setCargando(false);
    }
  };

  // Buscar clientes
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = clientes.filter(
      (c) =>
        c.primer_nombre.toLowerCase().includes(texto) ||
        c.segundo_nombre.toLowerCase().includes(texto) ||
        c.primer_apellido.toLowerCase().includes(texto) ||
        c.segundo_apellido.toLowerCase().includes(texto) ||
        c.direccion.toLowerCase().includes(texto) ||
        c.cedula.toLowerCase().includes(texto) ||
        c.celular.toLowerCase().includes(texto)
    );
    setClientesFiltrados(filtrados);
  };

  // Agregar cliente
  const agregarCliente = async (nuevoCliente) => {
    try {
      const res = await fetch("http://localhost:3000/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCliente),
      });
      if (!res.ok) throw new Error("Error al registrar cliente");
      await obtenerClientes();
    } catch (error) {
      console.error("Error al registrar cliente:", error);
    }
  };

  // Editar cliente
  const guardarCambios = async (clienteActualizado) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/clientes/${clienteActualizado.id_cliente}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clienteActualizado),
        }
      );
      if (!res.ok) throw new Error("Error al actualizar cliente");
      await obtenerClientes();
    } catch (error) {
      console.error("Error al editar cliente:", error);
    }
  };

  // Eliminar cliente
  const confirmarEliminar = async (id_cliente) => {
    try {
      const res = await fetch(`http://localhost:3000/api/clientes/${id_cliente}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar cliente");
      await obtenerClientes();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  useEffect(() => {
    obtenerClientes();
  }, []);

  // Paginación
  const indiceInicial = (paginaActual - 1) * elementosPorPagina;
  const clientesPaginados = clientesFiltrados.slice(
    indiceInicial,
    indiceInicial + elementosPorPagina
  );

  return (
    <Container className="mt-4">
      <h4>Clientes</h4>
      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setMostrarRegistro(true)}>
            + Nuevo Cliente
          </Button>
        </Col>
      </Row>

      <TablaClientes
        clientes={clientesPaginados}
        cargando={cargando}
        abrirModalEdicion={(c) => {
          setClienteEditar(c);
          setMostrarEdicion(true);
        }}
        abrirModalEliminacion={(c) => {
          setClienteEliminar(c);
          setMostrarEliminacion(true);
        }}
        totalElementos={clientesFiltrados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />

      {/* Modales */}
      <ModalRegistroCliente
        show={mostrarRegistro}
        handleClose={() => setMostrarRegistro(false)}
        agregarCliente={agregarCliente}
      />
      <ModalEdicionCliente
        mostrar={mostrarEdicion}
        setMostrar={setMostrarEdicion}
        clienteEditar={clienteEditar}
        guardarCambios={guardarCambios}
      />
      <ModalEliminacionCliente
        mostrar={mostrarEliminacion}
        setMostrar={setMostrarEliminacion}
        clienteEliminar={clienteEliminar}
        confirmarEliminar={confirmarEliminar}
      />
    </Container>
  );
};

export default Clientes;