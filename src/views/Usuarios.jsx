import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaUsuarios from '../components/usuarios/TablaUsuarios';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import ModalRegistroUsuario from '../components/usuarios/ModalRegistroUsuario';
import ModalEdicionUsuario from '../components/usuarios/ModalEdicionUsuario';
import ModalEliminacionUsuario from '../components/usuarios/ModalEliminacionUsuario';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [textoBusqueda, setTextoBusqueda] = useState('');

    // Modal de registro
    const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        usuario: '',
        contraseña: ''
    });

    // Modal de edición
    const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    // Modal de eliminación
    const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

    // Obtener usuarios
    const obtenerUsuarios = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/usuarios');
            if (!respuesta.ok) throw new Error('Error al obtener los usuarios');

            const datos = await respuesta.json();
            setUsuarios(datos);
            setUsuariosFiltrados(datos);
            setCargando(false);
        } catch (error) {
            console.error('Error:', error);
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    // Buscar usuarios
    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtrados = usuarios.filter(
            (u) =>
                u.usuario.toLowerCase().includes(texto) ||
                (u.rol && u.rol.toLowerCase().includes(texto))
        );
        setUsuariosFiltrados(filtrados);
    };

    // Crear usuario
    const manejarCambioInput = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
    };

    const agregarUsuario = async () => {
        if (!nuevoUsuario.usuario.trim() || !nuevoUsuario.contraseña.trim()) return;

        try {
            const respuesta = await fetch('http://localhost:3000/api/registrarusuario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoUsuario),
            });

            if (!respuesta.ok) throw new Error('Error al guardar el usuario');

            setNuevoUsuario({ usuario: '', contraseña: '', rol: '' });
            setMostrarModalRegistro(false);
            await obtenerUsuarios();
        } catch (error) {
            console.error('Error al agregar usuario:', error);
        }
    };

    // 🔹 Editar usuario (abrir modal)
    const abrirModalEdicion = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setMostrarModalEdicion(true);
    };

    // 🔹 Guardar edición (actualizar en backend)
    const guardarEdicion = async () => {
        if (!usuarioSeleccionado) return;

        try {
            const respuesta = await fetch(
                `http://localhost:3000/api/actualizarusuario/${usuarioSeleccionado.id_usuario}`,
                {
                    method: 'PATCH', // ✅ Se cambia de PUT a PATCH
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        usuario: usuarioSeleccionado.usuario,
                        contraseña: usuarioSeleccionado.contraseña
                    }),
                }
            );

            if (!respuesta.ok) throw new Error('Error al actualizar usuario');

            setMostrarModalEdicion(false);
            setUsuarioSeleccionado(null);
            await obtenerUsuarios();
        } catch (error) {
            console.error('Error al editar usuario:', error);
        }
    };

    // Eliminar usuario
    const abrirModalEliminacion = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setMostrarModalEliminacion(true);
    };

    const confirmarEliminacion = async () => {
        try {
            const respuesta = await fetch(
                `http://localhost:3000/api/eliminarusuario/${usuarioSeleccionado.id_usuario}`,
                { method: 'DELETE' }
            );

            if (!respuesta.ok) throw new Error('Error al eliminar usuario');

            setMostrarModalEliminacion(false);
            await obtenerUsuarios();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h4>Usuarios</h4>
            <Row>
                <Col lg={5} md={8} sm={8} xs={7}>
                    <CuadroBusquedas
                        textoBusqueda={textoBusqueda}
                        manejarCambioBusqueda={manejarCambioBusqueda}
                    />
                </Col>
                <Col className="text-end">
                    <Button
                        className="color-boton-registro"
                        onClick={() => setMostrarModalRegistro(true)}
                    >
                        + Nuevo Usuario
                    </Button>
                </Col>
            </Row>

            <TablaUsuarios
                usuarios={usuariosFiltrados}
                cargando={cargando}
                abrirModalEdicion={abrirModalEdicion}
                abrirModalEliminacion={abrirModalEliminacion}
            />

            <ModalRegistroUsuario
                mostrarModal={mostrarModalRegistro}
                setMostrarModal={setMostrarModalRegistro}
                nuevoUsuario={nuevoUsuario}
                manejarCambioInput={manejarCambioInput}
                agregarUsuario={agregarUsuario}
            />

            <ModalEdicionUsuario
                mostrar={mostrarModalEdicion}
                setMostrar={setMostrarModalEdicion}
                usuario={usuarioSeleccionado}
                setUsuario={setUsuarioSeleccionado}
                guardarEdicion={guardarEdicion}
            />

            <ModalEliminacionUsuario
                mostrar={mostrarModalEliminacion}
                setMostrar={setMostrarModalEliminacion}
                usuario={usuarioSeleccionado}
                confirmarEliminacion={confirmarEliminacion}
            />
        </Container>
    );
};

export default Usuarios;