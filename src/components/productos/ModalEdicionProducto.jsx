import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalEdicionProducto = ({
  mostrar,
  setMostrar,
  productoEditado,
  setProductoEditado,
  guardarEdicion,
}) => {
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal
      backdrop="static"
      show={mostrar}
      onHide={() => setMostrar(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group controlId="nombreProducto">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre_producto"
                  value={productoEditado?.nombre_producto}
                  onChange={manejarCambio}
                  placeholder="Nombre del producto"
                  maxLength={100}
                  required
                  autoFocus
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group controlId="categoriaProducto">
                <Form.Label>ID Categoría</Form.Label>
                <Form.Control
                  type="text"
                  name="id_categoria"
                  value={productoEditado?.id_categoria}
                  onChange={manejarCambio}
                  placeholder="ID categoría"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="descripcionProducto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="descripcion_producto"
              value={productoEditado?.descripcion_producto}
              onChange={manejarCambio}
              placeholder="Descripción"
              maxLength={300}
            />
          </Form.Group>

          <Row>
            <Col md={4} className="mb-3">
              <Form.Group controlId="precioProducto">
                <Form.Label>Precio Unitario</Form.Label>
                <Form.Control
                  type="number"
                  name="precio_unitario"
                  value={productoEditado?.precio_unitario}
                  onChange={manejarCambio}
                  placeholder="0.00"
                  step="0.01"
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group controlId="stockProducto">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={productoEditado?.stock}
                  onChange={manejarCambio}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group controlId="imagenProducto">
                <Form.Label>Imagen (URL)</Form.Label>
                <Form.Control
                  type="text"
                  name="imagen"
                  value={productoEditado?.imagen}
                  onChange={manejarCambio}
                  placeholder="URL de la imagen"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrar(false)}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={guardarEdicion}
          disabled={!productoEditado?.nombre_producto?.trim()}
        >
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;