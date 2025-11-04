import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import TablaUsuarios from "../components/usuarios/TablaUsuarios";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [accion, setAccion] = useState(""); // "agregar", "editar", "eliminar"
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: "",
    contraseña: "",
    rol: "",
  });

  // ===================== FUNCIONES DE MODALES =====================

  const abrirModalAgregar = () => {
    setNuevoUsuario({ usuario: "", contraseña: "", rol: "" });
    setAccion("agregar");
    setMostrarModal(true);
  };

  const abrirModalEdicion = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setAccion("editar");
    setMostrarModal(true);
  };

  const abrirModalEliminacion = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setAccion("eliminar");
    setMostrarModal(true);
  };

  // ===================== FUNCIONES CRUD SIMULADAS =====================

  const agregarUsuario = () => {
    setUsuarios((prev) => [
      ...prev,
      { ...nuevoUsuario, id_usuario: prev.length + 1 },
    ]);
    setMostrarModal(false);
  };

  const guardarEdicion = () => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.id_usuario === usuarioSeleccionado.id_usuario ? usuarioSeleccionado : u
      )
    );
    setMostrarModal(false);
  };

  const confirmarEliminacion = () => {
    setUsuarios((prev) =>
      prev.filter((u) => u.id_usuario !== usuarioSeleccionado.id_usuario)
    );
    setMostrarModal(false);
  };

  // ===================== FUNCIONES DE INPUT =====================

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    if (accion === "agregar") {
      setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
    } else if (accion === "editar") {
      setUsuarioSeleccionado((prev) => ({ ...prev, [name]: value }));
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtrados = usuarios.filter(
      (u) =>
        u.usuario.toLowerCase().includes(texto) ||
        u.rol.toLowerCase().includes(texto)
    );
    setUsuariosFiltrados(filtrados);
  };

  // ===================== OBTENER USUARIOS SIMULADO =====================

  useEffect(() => {
    // Simulación de fetch
    const fetchUsuarios = async () => {
      setCargando(true);
      const datos = [
        { id_usuario: 1, usuario: "admin", contraseña: "1234", rol: "Admin" },
        { id_usuario: 2, usuario: "magdiel", contraseña: "abcd", rol: "Usuario" },
      ];
      setUsuarios(datos);
      setUsuariosFiltrados(datos);
      setCargando(false);
    };

    fetchUsuarios();
  }, []);

  return (
    <Container className="mt-4">
      <h4>Usuarios</h4>
      <Row className="mb-3">
        <Col lg={5} md={8} sm={8} xs={7}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
        <Col className="text-end">
          <Button className="color-boton-registro" onClick={abrirModalAgregar}>
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

      {/* ===================== MODAL ===================== */}
      <Modal
        show={mostrarModal}
        onHide={() => setMostrarModal(false)}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {accion === "agregar"
              ? "Agregar Usuario"
              : accion === "editar"
              ? "Editar Usuario"
              : "Eliminar Usuario"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {accion === "eliminar" ? (
            <p>
              ¿Seguro que deseas eliminar al usuario{" "}
              <strong>{usuarioSeleccionado?.usuario}</strong>?
            </p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="text"
                  name="usuario"
                  value={accion === "agregar" ? nuevoUsuario.usuario : usuarioSeleccionado?.usuario}
                  onChange={manejarCambioInput}
                  placeholder="Nombre de usuario"
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  name="contraseña"
                  value={accion === "agregar" ? nuevoUsuario.contraseña : usuarioSeleccionado?.contraseña}
                  onChange={manejarCambioInput}
                  placeholder="Contraseña"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Rol</Form.Label>
                <Form.Control
                  type="text"
                  name="rol"
                  value={accion === "agregar" ? nuevoUsuario.rol : usuarioSeleccionado?.rol}
                  onChange={manejarCambioInput}
                  placeholder="Rol"
                  required
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModal(false)}>
            Cancelar
          </Button>
          <Button
            variant={accion === "eliminar" ? "danger" : "primary"}
            onClick={() =>
              accion === "agregar"
                ? agregarUsuario()
                : accion === "editar"
                ? guardarEdicion()
                : confirmarEliminacion()
            }
          >
            {accion === "eliminar"
              ? "Eliminar"
              : accion === "editar"
              ? "Guardar cambios"
              : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Usuarios;