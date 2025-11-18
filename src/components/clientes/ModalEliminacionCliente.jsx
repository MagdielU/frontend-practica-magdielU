import { Modal, Button } from "react-bootstrap";

const ModalEliminacionCliente = ({ mostrar, setMostrar, clienteEliminar, confirmarEliminar }) => {
  // Si no hay cliente seleccionado, no renderizar
  if (!clienteEliminar) return null;

  const manejarEliminar = () => {
    // Usar id_cliente que es el que está en la base de datos
    confirmarEliminar(clienteEliminar.id_cliente);
    setMostrar(false);
  };

  return (
    <Modal show={mostrar} onHide={() => setMostrar(false)} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar al cliente{" "}
          <strong>{clienteEliminar.primer_nombre} {clienteEliminar.primer_apellido}</strong>?
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