// src/pages/Ventas.jsx
import { useState, useEffect } from "react";
import TablaVentas from "../components/ventas/TablaVentas";
import ModalRegistroVenta from "../components/ventas/ModalRegistroVenta";
import ModalEdicionVenta from "../components/ventas/ModalEdicionVenta";
import ModalEliminacionVenta from "../components/ventas/ModalEliminacionVenta";
import { Button } from "react-bootstrap";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({ id_cliente: "", id_empleado: "", fecha_venta: "" });
  const [ventaEnEdicion, setVentaEnEdicion] = useState(null);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [mostrarEdicion, setMostrarEdicion] = useState(false);
  const [mostrarEliminacion, setMostrarEliminacion] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Simulando datos de clientes, empleados y productos
  const clientes = [
    { id_cliente: 1, primer_nombre: "Juan", primer_apellido: "Pérez" },
    { id_cliente: 2, primer_nombre: "Ana", primer_apellido: "García" }
  ];
  const empleados = [
    { id_empleado: 1, primer_nombre: "Carlos", primer_apellido: "López" },
    { id_empleado: 2, primer_nombre: "María", primer_apellido: "Santos" }
  ];
  const productos = [
    { id_producto: 1, nombre_producto: "Teclado", precio_unitario: 500, stock: 10 },
    { id_producto: 2, nombre_producto: "Mouse", precio_unitario: 300, stock: 15 }
  ];

  const hoy = new Date().toISOString().split("T")[0];

  // Simulación de carga de ventas
  useEffect(() => {
    const ventasSimuladas = [
      { id_venta: 1, fecha_venta: new Date().toISOString(), nombre_cliente: "Juan Pérez", nombre_empleado: "Carlos López", total_venta: 1000 },
      { id_venta: 2, fecha_venta: new Date().toISOString(), nombre_cliente: "Ana García", nombre_empleado: "María Santos", total_venta: 800 }
    ];
    setVentas(ventasSimuladas);
  }, []);

  // === FUNCIONES PARA LA TABLA ===
  const obtenerDetalles = (id_venta) => {
    const venta = ventas.find(v => v.id_venta === id_venta);
    if (!venta) return;
    alert(`Detalles de la venta #${id_venta}\nCliente: ${venta.nombre_cliente}\nTotal: C$ ${venta.total_venta}`);
  };

  const abrirModalEdicion = (venta) => {
    setVentaEnEdicion({ ...venta });
    setDetalles([]); // Inicialmente vacíos
    setMostrarEdicion(true);
  };

  const abrirModalEliminacion = (venta) => {
    setVentaAEliminar(venta);
    setMostrarEliminacion(true);
  };

  const agregarVenta = () => {
    const id_nueva = ventas.length + 1;
    const total = detalles.reduce((s, d) => s + d.cantidad * d.precio_unitario, 0);
    const cliente = clientes.find(c => c.id_cliente === nuevaVenta.id_cliente);
    const empleado = empleados.find(e => e.id_empleado === nuevaVenta.id_empleado);

    const nueva = {
      id_venta: id_nueva,
      fecha_venta: nuevaVenta.fecha_venta || hoy,
      nombre_cliente: cliente ? `${cliente.primer_nombre} ${cliente.primer_apellido}` : "",
      nombre_empleado: empleado ? `${empleado.primer_nombre} ${empleado.primer_apellido}` : "",
      total_venta: total
    };

    setVentas(prev => [...prev, nueva]);
    setDetalles([]);
    setNuevaVenta({ id_cliente: "", id_empleado: "", fecha_venta: hoy });
    setMostrarRegistro(false);
  };

  const actualizarVenta = () => {
    if (!ventaEnEdicion) return;
    const total = detalles.reduce((s, d) => s + d.cantidad * d.precio_unitario, 0);
    setVentas(prev => prev.map(v => v.id_venta === ventaEnEdicion.id_venta ? { ...ventaEnEdicion, total_venta: total } : v));
    setDetalles([]);
    setVentaEnEdicion(null);
    setMostrarEdicion(false);
  };

  const eliminarVenta = () => {
    if (!ventaAEliminar) return;
    setVentas(prev => prev.filter(v => v.id_venta !== ventaAEliminar.id_venta));
    setVentaAEliminar(null);
    setMostrarEliminacion(false);
  };

  const totalElementos = ventas.length;

  return (
    <div className="container mt-4">
      <h2>Gestión de Ventas</h2>
      <Button className="mb-3" onClick={() => setMostrarRegistro(true)}>Nueva Venta</Button>

      <TablaVentas
        ventas={ventas}
        cargando={false}
        obtenerDetalles={obtenerDetalles}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={totalElementos}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={setPaginaActual}
      />

      {/* Modales */}
      <ModalRegistroVenta
        mostrar={mostrarRegistro}
        setMostrar={setMostrarRegistro}
        nuevaVenta={nuevaVenta}
        setNuevaVenta={setNuevaVenta}
        detalles={detalles}
        setDetalles={setDetalles}
        clientes={clientes}
        empleados={empleados}
        productos={productos}
        agregarVenta={agregarVenta}
        hoy={hoy}
      />

      <ModalEdicionVenta
        mostrar={mostrarEdicion}
        setMostrar={setMostrarEdicion}
        venta={ventaEnEdicion}
        ventaEnEdicion={ventaEnEdicion}
        setVentaEnEdicion={setVentaEnEdicion}
        detalles={detalles}
        setDetalles={setDetalles}
        clientes={clientes}
        empleados={empleados}
        productos={productos}
        actualizarVenta={actualizarVenta}
      />

      <ModalEliminacionVenta
        mostrar={mostrarEliminacion}
        setMostrar={setMostrarEliminacion}
        venta={ventaAEliminar}
        confirmarEliminacion={eliminarVenta}
      />
    </div>
  );
};

export default Ventas;