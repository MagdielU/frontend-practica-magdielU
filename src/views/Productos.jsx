import { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TablaProductos from "../components/productos/TablaProductos";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto.jsx";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto.jsx";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas.jsx";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto.jsx";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const [productoEditado, setProductoEditado] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  // 🔹 Obtener productos
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/producto");
      if (!respuesta.ok) throw new Error("Error al obtener productos");
      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error);
      setCargando(false);
    }
  };

  // 🔹 Buscar productos
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = productos.filter((p) =>
      p.nombre_producto?.toLowerCase().includes(texto) ||
      p.descripcion_producto?.toLowerCase().includes(texto) ||
      p.id_categoria?.toString().includes(texto) ||
      p.precio_unitario?.toString().includes(texto) ||
      p.stock?.toString().includes(texto)
    );

    setProductosFiltrados(filtrados);
    establecerPaginaActual(1);
  };

  // 🔹 Modal registro
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    descripcion_producto: "",
    id_categoria: "",
    precio_unitario: "",
    stock: "",
    imagen: "",
  });

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre_producto.trim()) return;

    try {
      const respuesta = await fetch("http://localhost:3000/api/registrarProducto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) throw new Error("Error al registrar producto");

      setNuevoProducto({
        nombre_producto: "",
        descripcion_producto: "",
        id_categoria: "",
        precio_unitario: "",
        stock: "",
        imagen: "",
      });

      setMostrarModal(false);
      obtenerProductos();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("No se pudo agregar el producto");
    }
  };

  // 🔹 Modal edición
  const abrirModalEdicion = (producto) => {
    setProductoEditado({ ...producto });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!productoEditado.nombre_producto.trim()) return;

    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarProducto/${productoEditado.id_producto}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productoEditado),
        }
      );

      if (!respuesta.ok) throw new Error("Error al editar producto");

      setMostrarModalEdicion(false);
      obtenerProductos();
    } catch (error) {
      console.error("Error al editar:", error);
    }
  };

  // 🔹 Modal eliminación
  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarProducto/${productoAEliminar.id_producto}`,
        { method: "DELETE" }
      );

      if (!respuesta.ok) throw new Error("Error al eliminar");

      setMostrarModalEliminar(false);
      setProductoAEliminar(null);
      obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // 🔹 Paginación
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  // 🔹 Exportar a Excel
  const exportarExcelProductos = () => {
    const datos = productosFiltrados.map((p) => ({
      ID: p.id_producto,
      Nombre: p.nombre_producto,
      Descripción: p.descripcion_producto,
      Categoría: p.id_categoria,
      Precio: parseFloat(p.precio_unitario),
      Stock: p.stock,
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Producto");

    const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Productos.xlsx");
  };

  // 🔹 PDF general
  const generarPDFProductos = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Lista de Productos", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["ID", "Nombre", "Descripción", "Categoría", "Precio", "Stock"]],
      body: productosFiltrados.map((p) => [
        p.id_producto,
        p.nombre_producto,
        p.descripcion_producto,
        p.id_categoria,
        p.precio_unitario,
        p.stock,
      ]),
    });

    doc.save("productos.pdf");
  };

  return (
    <Container className="mt-4">
      <h4>Productos</h4>

      <Row className="mb-3">
        <Col lg={5}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>

        <Col className="text-end">
          <Button className="color-boton-registro" onClick={() => setMostrarModal(true)}>
            + Nuevo Producto
          </Button>
        </Col>

        <Col lg={3}>
          <Button variant="secondary" onClick={exportarExcelProductos} style={{ width: "100%" }}>
            Excel
          </Button>
        </Col>

        <Col lg={3}>
          <Button variant="secondary" onClick={generarPDFProductos} style={{ width: "100%" }}>
            PDF
          </Button>
        </Col>
      </Row>

      <TablaProductos
        productos={productosPaginados}
        cargando={cargando}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        totalElementos={productosFiltrados.length}
        elementosPorPagina={elementosPorPagina}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />

      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        agregarProducto={agregarProducto}
      />

      <ModalEdicionProducto
        mostrar={mostrarModalEdicion}
        setMostrar={setMostrarModalEdicion}
        productoEditado={productoEditado}
        setProductoEditado={setProductoEditado}
        guardarEdicion={guardarEdicion}
      />

      <ModalEliminacionProducto
        mostrar={mostrarModalEliminar}
        setMostrar={setMostrarModalEliminar}
        producto={productoAEliminar}
        confirmarEliminacion={confirmarEliminacion}
      />
    </Container>
  );
};

export default Productos;