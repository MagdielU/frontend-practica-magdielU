import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroEmpleado = ({
  mostrarModal,
  setMostrarModal,
  nuevoEmpleado,
  manejarCambioInput,
  agregarEmpleado,
}) => {
  return (
    <Modal
      backdrop="static"
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="primerNombre">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              type="text"
              name="primer_nombre"
              value={nuevoEmpleado.primer_nombre}
              onChange={manejarCambioInput}
              placeholder="Ej: Ana"
              maxLength={20}
              required
              autoFocus
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="segundoNombre">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              type="text"
              name="segundo_nombre"
              value={nuevoEmpleado.segundo_nombre}
              onChange={manejarCambioInput}
              placeholder="Opcional"
              maxLength={20}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="primerApellido">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              type="text"
              name="primer_apellido"
              value={nuevoEmpleado.primer_apellido}
              onChange={manejarCambioInput}
              placeholder="Ej: Martínez"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="segundoApellido">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              type="text"
              name="segundo_apellido"
              value={nuevoEmpleado.segundo_apellido}
              onChange={manejarCambioInput}
              placeholder="Opcional"
              maxLength={20}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="celular">
            <Form.Label>Celular</Form.Label>
            <Form.Control
              type="text"
              name="celular"
              value={nuevoEmpleado.celular}
              onChange={manejarCambioInput}
              placeholder="Ej: 87771111"
              maxLength={8}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="cargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              name="cargo"
              value={nuevoEmpleado.cargo}
              onChange={manejarCambioInput}
              placeholder="Ej: Vendedor"
              maxLength={20}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fechaContratacion">
            <Form.Label>Fecha de Contratación</Form.Label>
            <Form.Control
              type="date"
              name="fecha_contratacion"
              value={nuevoEmpleado.fecha_contratacion}
              onChange={manejarCambioInput}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={agregarEmpleado}
          disabled={!nuevoEmpleado.primer_nombre.trim() || !nuevoEmpleado.primer_apellido.trim() || !nuevoEmpleado.celular.trim() || !nuevoEmpleado.cargo.trim() || !nuevoEmpleado.fecha_contratacion}
        >
          Guardar Empleado
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;