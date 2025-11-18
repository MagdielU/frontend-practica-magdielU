import { Modal, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";

const ModalEdicionCliente = ({ mostrar, setMostrar, clienteEditar, guardarCambios }) => {
  const [cliente, setCliente] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    direccion: "",
    cedula: "",
    celular: ""
  });

  // Cargar datos del cliente cuando se abra el modal
  useEffect(() => {
    if (clienteEditar) {
      setCliente(clienteEditar);
    }
  }, [clienteEditar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const manejarGuardar = () => {
    guardarCambios(cliente);
    setMostrar(false);
  };

  if (!clienteEditar) return null;

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {["primer_nombre", "segundo_nombre", "primer_apellido", "segundo_apellido", "direccion", "cedula", "celular"].map((campo) => (
            <Form.Group className="mb-2" key={campo}>
              <Form.Label>{campo.replace("_", " ").toUpperCase()}</Form.Label>
              <Form.Control
                name={campo}
                value={cliente[campo] || ""}
                onChange={manejarCambio}
              />
            </Form.Group>
          ))}
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