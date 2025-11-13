import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const ModalEdicionCliente = ({ mostrar, setMostrar, clienteEditar, guardarCambios }) => {
  const [cliente, setCliente] = useState({});

  // Cargar datos del cliente cuando se abra el modal
  useEffect(() => {
    if (clienteEditar) {
      setCliente(clienteEditar);
    }
  }, [clienteEditar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const manejarGuardar = () => {
    guardarCambios(cliente);
    setMostrar(false);
  };

  if (!cliente) return null;

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              name="primer_nombre"
              value={cliente.primer_nombre || ""}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              name="segundo_nombre"
              value={cliente.segundo_nombre || ""}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              name="primer_apellido"
              value={cliente.primer_apellido || ""}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              name="segundo_apellido"
              value={cliente.segundo_apellido || ""}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              value={cliente.direccion || ""}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              name="cedula"
              value={cliente.cedula || ""}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Celular</Form.Label>
            <Form.Control
              name="celular"
              value={cliente.celular || ""}
              onChange={manejarCambio}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={manejarGuardar}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCliente;