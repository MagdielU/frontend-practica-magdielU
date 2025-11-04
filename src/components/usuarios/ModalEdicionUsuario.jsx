import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionUsuario = ({
  mostrar,
  setMostrar,
  usuarioEditado,
  setUsuarioEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuarioEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal backdrop="static" show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nombreUsuario">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={usuarioEditado?.nombre || ""}
              onChange={manejarCambio}
              placeholder="Ej: Juan Pérez"
              maxLength={50}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="correoUsuario">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={usuarioEditado?.correo || ""}
              onChange={manejarCambio}
              placeholder="Ej: juan@example.com"
              maxLength={100}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="rolUsuario">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              name="rol"
              value={usuarioEditado?.rol || ""}
              onChange={manejarCambio}
              required
            >
              <option value="">Seleccione un rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
              <option value="Invitado">Invitado</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="telefonoUsuario">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              value={usuarioEditado?.telefono || ""}
              onChange={manejarCambio}
              placeholder="Ej: 8888-8888"
              maxLength={15}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={
            !usuarioEditado?.nombre?.trim() ||
            !usuarioEditado?.correo?.trim() ||
            !usuarioEditado?.rol?.trim()
          }
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionUsuario;