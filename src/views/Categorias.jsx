import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import TablaCategorias from '../components/categorias/TablaCategorias';
import ModalRegistroCategoria from '../components/categorias/ModalRegistroCategoria';
import ModalEdicionCategoria from '../components/categorias/ModalEdicionCategoria';
import ModalEliminacionCategoria from '../components/categorias/ModalEliminacionCategoria';

const Categorias = () => {

    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [mostrarModal, setMostrarModal] = useState(false);
    const [nuevaCategoria, setNuevaCategoria] = useState({
        nombre_categoria: '',
        descripcion_categoria: ''
    });

    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

    const [categoriaEditada, setCategoriaEditada] = useState(null);
    const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

    const [paginaActual, establecerPaginaActual] = useState(1);
    const elementosPorPagina = 5;


    // 🔹 CALCULAR PAGINACIÓN
    const categoriasPaginadas = categoriasFiltradas.slice(
        (paginaActual - 1) * elementosPorPagina,
        paginaActual * elementosPorPagina
    );

    // 🔹 INPUTS NUEVA CATEGORÍA
    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevaCategoria(prev => ({ ...prev, [name]: value }));
    };

    // 🔹 ABRIR MODAL EDICIÓN
    const abrirModalEdicion = (categoria) => {
        setCategoriaEditada({ ...categoria });
        setMostrarModalEdicion(true);
    };

    // 🔹 GUARDAR EDICIÓN (PATCH)
    const guardarEdicion = async () => {
        if (!categoriaEditada.nombre_categoria.trim()) return;
        try {
            const respuesta = await fetch(
                `http://localhost:3000/api/actualizarCategoria/${categoriaEditada.id_categoria}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(categoriaEditada)
                }
            );
            if (!respuesta.ok) throw new Error('Error al actualizar');
            setMostrarModalEdicion(false);
            await obtenerCategorias();
        } catch (error) {
            console.error("Error al editar categoría:", error);
            alert("No se pudo actualizar la categoría.");
        }
    };

    // 🔹 MODAL ELIMINAR
    const abrirModalEliminacion = (categoria) => {
        setCategoriaAEliminar(categoria);
        setMostrarModalEliminar(true);
    };

    const confirmarEliminacion = async () => {
        try {
            const respuesta = await fetch(
                `http://localhost:3000/api/eliminarCategoria/${categoriaAEliminar.id_categoria}`,
                { method: 'DELETE' }
            );

            if (!respuesta.ok) throw new Error('Error al eliminar');

            setMostrarModalEliminar(false);
            setCategoriaAEliminar(null);
            await obtenerCategorias();
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
            alert("No se pudo eliminar la categoría.");
        }
    };

    // 🔹 AGREGAR CATEGORÍA
    const agregarCategoria = async () => {
        if (!nuevaCategoria.nombre_categoria.trim()) return;

        try {
            const respuesta = await fetch(
                'http://localhost:3000/api/registrarCategoria',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(nuevaCategoria)
                }
            );

            if (!respuesta.ok) throw new Error('Error al guardar');

            // Limpiar y cerrar
            setNuevaCategoria({ nombre_categoria: '', descripcion_categoria: '' });
            setMostrarModal(false);
            await obtenerCategorias();
        } catch (error) {
            console.error("Error al agregar categoría:", error);
            alert("No se pudo guardar la categoría.");
        }
    };

    // 🔹 OBTENER CATEGORÍAS
    const obtenerCategorias = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/categorias');
            if (!respuesta.ok) throw new Error('Error al obtener');

            const datos = await respuesta.json();
            setCategorias(datos);
            setCategoriasFiltradas(datos);
            setCargando(false);
        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    };

    // 🔹 FILTRO DE BÚSQUEDA
    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtradas = categorias.filter(
            (categoria) =>
                categoria.nombre_categoria?.toLowerCase().includes(texto) ||
                categoria.descripcion_categoria?.toLowerCase().includes(texto)
        );

        setCategoriasFiltradas(filtradas);
        establecerPaginaActual(1);
    };

    useEffect(() => {
        obtenerCategorias();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Categorías</h4>

                <Row>
                    <Col lg={5}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>

                    <Col className="text-end">
                        <Button
                            className="color-boton-registro"
                            onClick={() => setMostrarModal(true)}
                        >
                            + Nueva Categoría
                        </Button>
                    </Col>
                </Row>

                <TablaCategorias
                    categorias={categoriasPaginadas}
                    cargando={cargando}
                    abrirModalEdicion={abrirModalEdicion}
                    abrirModalEliminacion={abrirModalEliminacion}
                    totalElementos={categoriasFiltradas.length}
                    elementosPorPagina={elementosPorPagina}
                    paginaActual={paginaActual}
                    establecerPaginaActual={establecerPaginaActual}
                />

                <ModalRegistroCategoria
                    mostrarModal={mostrarModal}
                    setMostrarModal={setMostrarModal}
                    nuevaCategoria={nuevaCategoria}
                    manejarCambioInput={manejarCambioInput}
                    agregarCategoria={agregarCategoria}
                />

                <ModalEdicionCategoria
                    mostrar={mostrarModalEdicion}
                    setMostrar={setMostrarModalEdicion}
                    categoriaEditada={categoriaEditada}
                    setCategoriaEditada={setCategoriaEditada}
                    guardarEdicion={guardarEdicion}
                />

                <ModalEliminacionCategoria
                    mostrar={mostrarModalEliminar}
                    setMostrar={setMostrarModalEliminar}
                    categoria={categoriaAEliminar}
                    confirmarEliminacion={confirmarEliminacion}
                />
            </Container>
        </>
    );
};

export default Categorias;