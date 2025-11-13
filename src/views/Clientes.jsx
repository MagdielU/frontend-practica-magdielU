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

    // Estados de los modales
    const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

    const [clienteEditar, setClienteEditar] = useState(null);
    const [clienteEliminar, setClienteEliminar] = useState(null);

    // Estados de paginación
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 5;

    // Obtener clientes del backend
    const obtenerClientes = async () => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/clientes");
            if (!respuesta.ok) throw new Error("Error al obtener los clientes");
            const datos = await respuesta.json();
            setClientes(datos);
            setClientesFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.error(error.message);
            setCargando(false);
        }
    };

    // Buscar clientes
    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);
        const filtrados = clientes.filter(
            (cliente) =>
                cliente.primer_nombre.toLowerCase().includes(texto) ||
                cliente.segundo_nombre.toLowerCase().includes(texto) ||
                cliente.primer_apellido.toLowerCase().includes(texto) ||
                cliente.segundo_apellido.toLowerCase().includes(texto) ||
                cliente.direccion.toLowerCase().includes(texto) ||
                cliente.cedula.toLowerCase().includes(texto) ||
                cliente.celular.toLowerCase().includes(texto)
        );
        setClientesFiltrados(filtrados);
    };

    // Agregar cliente
    const agregarCliente = async (nuevoCliente) => {
        try {
            const respuesta = await fetch("http://localhost:3000/api/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoCliente),
            });

            if (!respuesta.ok) throw new Error("Error al registrar el cliente");

            await obtenerClientes();
        } catch (error) {
            console.error("Error al registrar el cliente", error);
        }
    };

    // Guardar cambios de edición
    const guardarCambios = async (clienteActualizado) => {
        try {
            const respuesta = await fetch(
                `http://localhost:3000/api/actualizarclientepatch/${clienteActualizado.id_cliente}`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(clienteActualizado),
                }
            );

            if (!respuesta.ok) throw new Error("Error al actualizar el cliente");

            await obtenerClientes();
        } catch (error) {
            console.error("Error al editar cliente:", error);
        }
    };

    // Eliminar cliente
    // Eliminar cliente
    const confirmarEliminar = async (id_cliente) => {
        try {
            // Asegúrate de que la ruta coincida con tu backend
            const respuesta = await fetch(
                `http://localhost:3000/api/eliminarcliente/${id_cliente}`,
                { method: "DELETE" }
            );

            if (!respuesta.ok) {
                // Opcional: leer mensaje del backend si hay error
                const errorData = await respuesta.json();
                throw new Error(errorData.message || "Error al eliminar cliente");
            }

            // Refrescar lista después de eliminar
            await obtenerClientes();
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
        }
    };


    useEffect(() => {
        obtenerClientes();
    }, []);

    // Abrir modales
    const abrirModalRegistro = () => setMostrarModalRegistro(true);

    const abrirModalEdicion = (cliente) => {
        setClienteEditar(cliente);
        setMostrarModalEdicion(true);
    };

    const abrirModalEliminacion = (cliente) => {
        setClienteEliminar(cliente);
        setMostrarModalEliminacion(true);
    };

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
                    <Button variant="primary" onClick={abrirModalRegistro}>
                        + Nuevo Cliente
                    </Button>
                </Col>
            </Row>

            <TablaClientes
                clientes={clientesPaginados}
                cargando={cargando}
                abrirModalEdicion={abrirModalEdicion}
                abrirModalEliminacion={abrirModalEliminacion}
                totalElementos={clientesFiltrados.length}
                elementosPorPagina={elementosPorPagina}
                paginaActual={paginaActual}
                establecerPaginaActual={setPaginaActual}
            />

            {/* Modales */}
            <ModalRegistroCliente
                mostrar={mostrarModalRegistro}
                setMostrar={setMostrarModalRegistro}
                agregarCliente={agregarCliente}
            />

            <ModalEdicionCliente
                mostrar={mostrarModalEdicion}
                setMostrar={setMostrarModalEdicion}
                clienteEditar={clienteEditar}
                guardarCambios={guardarCambios}
            />

            <ModalEliminacionCliente
                mostrar={mostrarModalEliminacion}
                setMostrar={setMostrarModalEliminacion}
                clienteEliminar={clienteEliminar}
                confirmarEliminar={confirmarEliminar}
            />
        </Container>
    );
};

export default Clientes;