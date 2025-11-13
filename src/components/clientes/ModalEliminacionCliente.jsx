import { Modal, Button } from "react-bootstrap";

const ModalEliminacionCliente = ({ mostrar, setMostrar, clienteEliminar, confirmarEliminar }) => {
  if (!clienteEliminar) return null;

  const manejarEliminar = () => {
    confirmarEliminar(clienteEliminar.id); // Usamos id real de la tabla
    setMostrar(false);
  };

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar al cliente{" "}
          <strong>{clienteEliminar.nombre}</strong>?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={manejarEliminar}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionCliente;