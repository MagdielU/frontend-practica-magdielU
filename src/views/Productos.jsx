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

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/productos");
      if (!respuesta.ok) throw new Error("Error al obtener los productos");
      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      console.error(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = productos.filter(
      (p) =>
        p.nombre_producto?.toLowerCase().includes(texto) ||
        p.descripcion_producto?.toLowerCase().includes(texto) ||
        p.id_categoria?.toString().includes(texto) ||
        p.precio_unitario?.toString().includes(texto) ||
        p.stock?.toString().includes(texto)
    );
    setProductosFiltrados(filtrados);
    establecerPaginaActual(1);
  };

  // Modal registro
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
      const respuesta = await fetch("http://localhost:3000/api/registrarproducto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });
      if (!respuesta.ok) throw new Error("Error al guardar producto");

      setNuevoProducto({
        nombre_producto: "",
        descripcion_producto: "",
        id_categoria: "",
        precio_unitario: "",
        stock: "",
        imagen: "",
      });
      setMostrarModal(false);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al agregar producto:", error);
      alert("No se pudo guardar el producto.");
    }
  };

  // Modal edición
  const abrirModalEdicion = (producto) => {
    setProductoEditado({ ...producto });
    setMostrarModalEdicion(true);
  };

  const guardarEdicion = async () => {
    if (!productoEditado.nombre_producto.trim()) return;
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/actualizarproducto/${productoEditado.id_producto}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productoEditado),
        }
      );
      if (!respuesta.ok) throw new Error("Error al actualizar producto");
      setMostrarModalEdicion(false);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al editar producto:", error);
      alert("No se pudo actualizar el producto.");
    }
  };

  // Modal eliminación
  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminar(true);
  };

  const confirmarEliminacion = async () => {
    try {
      const respuesta = await fetch(
        `http://localhost:3000/api/eliminarproducto/${productoAEliminar.id_producto}`,
        { method: "DELETE" }
      );
      if (!respuesta.ok) throw new Error("Error al eliminar producto");
      setMostrarModalEliminar(false);
      setProductoAEliminar(null);
      await obtenerProductos();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto.");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Productos paginados
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );


// 🔹 Exportar productos a Excel
  const exportarExcelProductos = () => {
    const datos = productosFiltrados.map((producto) => ({
      ID: producto.id_producto,
      Nombre: producto.nombre_producto,
      Descripción: producto.descripcion_producto,
      Categoría: producto.id_categoria,
      Precio: parseFloat(producto.precio_unitario),
      Stock: producto.stock,
    }));

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Productos");

    const excelBuffer = XLSX.write(libro, { bookType: "xlsx", type: "array" });

    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    const nombreArchivo = `Productos_${dia}${mes}${anio}.xlsx`;

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, nombreArchivo);
  };

  // 🔹 Generar PDF de todos los productos
  const generarPDFProductos = () => {
    const doc = new jsPDF();

    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, 220, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.text("Lista de Productos", doc.internal.pageSize.getWidth() / 2, 18, {
      align: "center",
    });

    const columnas = ["ID", "Nombre", "Descripción", "Categoría", "Precio", "Stock"];
    const filas = productosFiltrados.map((p) => [
      p.id_producto,
      p.nombre_producto,
      p.descripcion_producto,
      p.id_categoria,
      `C$ ${p.precio_unitario}`,
      p.stock,
    ]);

    const totalPaginas = "{total_pages_count_string}";

    autoTable(doc, {
      head: [columnas],
      body: filas,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 12, cellPadding: 2 },
      margin: { top: 28, left: 14, right: 14 },
      didDrawPage: (data) => {
        const alturaPagina = doc.internal.pageSize.getHeight();
        const anchoPagina = doc.internal.pageSize.getWidth();
        const numeroPagina = doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const pie = `Página ${numeroPagina} de ${totalPaginas}`;
        doc.text(pie, anchoPagina / 2, alturaPagina - 10, { align: "center" });
      },
    });

    if (typeof doc.putTotalPages === "function") {
      doc.putTotalPages(totalPaginas);
    }

    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    const nombreArchivo = `Productos_${dia}${mes}${anio}.pdf`;

    doc.save(nombreArchivo);
  };

  // 🔹 Generar PDF individual (opcional)
  const generarPDFDetalleProducto = (producto) => {
    const pdf = new jsPDF();
    const anchoPagina = pdf.internal.pageSize.getWidth();

    pdf.setFillColor(28, 41, 51);
    pdf.rect(0, 0, 220, 30, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text(producto.nombre_producto, anchoPagina / 2, 18, { align: "center" });

    let posicionY = 50;

    if (producto.imagen) {
      const propiedades = pdf.getImageProperties(producto.imagen);
      const anchoImagen = 100;
      const altoImagen = (propiedades.height * anchoImagen) / propiedades.width;
      const posicionX = (anchoPagina - anchoImagen) / 2;
      pdf.addImage(producto.imagen, "JPEG", posicionX, 40, anchoImagen, altoImagen);
      posicionY = 40 + altoImagen + 10;
    }

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.text(`Descripción: ${producto.descripcion_producto}`, anchoPagina / 2, posicionY, {
      align: "center",
    });
    pdf.text(`Categoría: ${producto.id_categoria}`, anchoPagina / 2, posicionY + 10, {
      align: "center",
    });
    pdf.text(`Precio: C$ ${producto.precio_unitario}`, anchoPagina / 2, posicionY + 20, {
      align: "center",
    });
    pdf.text(`Stock: ${producto.stock}`, anchoPagina / 2, posicionY + 30, {
      align: "center",
    });

    pdf.save(`${producto.nombre_producto}.pdf`);
  };





  return (
    <Container className="mt-4">
      <h4>Productos</h4>
      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={7}>
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

        <Col lg={3} md={4} sm={4} xs={5}>
          <Button
            className="mb-2"
            onClick={exportarExcelProductos}
            variant="secondary"
            style={{ width: "100%" }}
          >
            Generar Excel
          </Button>
        </Col>

        <Col lg={3} md={4} sm={4} xs={5}>
          <Button
            className="mb-2"
            onClick={generarPDFProductos}
            variant="secondary"
            style={{ width: "100%" }}
          >
            Generar reporte PDF
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
        generarPDFDetalleProducto={generarPDFDetalleProducto}
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