import { Modal, Button, Form } from "react-bootstrap";

const ModalEdicionUsuario = ({ mostrar, setMostrar, usuario, setUsuario, guardarEdicion }) => {
    if (!usuario) return null;

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Modal show={mostrar} onHide={() => setMostrar(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            name="usuario"
                            value={usuario.usuario}
                            onChange={manejarCambio}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="contraseña"
                            value={usuario.contraseña}
                            onChange={manejarCambio}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setMostrar(false)}>
                    Cancelar
                </Button>
                <Button variant="success" onClick={guardarEdicion}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEdicionUsuario;