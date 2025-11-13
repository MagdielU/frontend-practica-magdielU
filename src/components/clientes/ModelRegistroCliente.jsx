import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";

const ModalRegistroCliente = ({ show, handleClose }) => {
  const [nuevoCliente, setNuevoCliente] = useState({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    direccion: "",
    cedula: "",
    celular: "",
  });

  const manejarCambio = (e) => {
    setNuevoCliente({
      ...nuevoCliente,
      [e.target.name]: e.target.value,
    });
  };

  const manejarGuardar = async () => {
    try {
      const respuesta = await fetch("http://localhost:3000/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoCliente),
      });

      if (!respuesta.ok) throw new Error("Error al registrar el cliente");

      alert("Cliente registrado correctamente ✅");
      handleClose(); // Cierra el modal
      setNuevoCliente({
        primer_nombre: "",
        segundo_nombre: "",
        primer_apellido: "",
        segundo_apellido: "",
        direccion: "",
        cedula: "",
        celular: "",
      });
    } catch (error) {
      console.error(error.message);
      alert("Error al registrar el cliente ❌");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Primer Nombre</Form.Label>
            <Form.Control
              name="primer_nombre"
              value={nuevoCliente.primer_nombre}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Segundo Nombre</Form.Label>
            <Form.Control
              name="segundo_nombre"
              value={nuevoCliente.segundo_nombre}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Primer Apellido</Form.Label>
            <Form.Control
              name="primer_apellido"
              value={nuevoCliente.primer_apellido}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Segundo Apellido</Form.Label>
            <Form.Control
              name="segundo_apellido"
              value={nuevoCliente.segundo_apellido}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              value={nuevoCliente.direccion}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              name="cedula"
              value={nuevoCliente.cedula}
              onChange={manejarCambio}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Celular</Form.Label>
            <Form.Control
              name="celular"
              value={nuevoCliente.celular}
              onChange={manejarCambio}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={manejarGuardar}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;