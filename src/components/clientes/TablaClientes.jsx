import { Table, Spinner } from "react-bootstrap";

const TablaClientes = ({ clientes, cargando }) => {

    if (cargando){
        return(
        <>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner>
        </>
        );
    }

    return (
        <>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Primer Nombre</th>
                        <th>Segundo Nombre</th>
                        <th>Primer Apellido</th>
                        <th>Segundo Apellido</th>
                        <th>Celular</th>
                        <th>Dirección</th>
                        <th>Cédula</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                  {clientes.map((cliente) => {
                    return(
                        <tr key={cliente.id_cliente}>
                            <td>{cliente.id_cliente}</td>
                            <td>{cliente.primer_nombre}</td>
                            <td>{cliente.segundo_nombre}</td>
                            <td>{cliente.primer_apellido}</td>
                            <td>{cliente.segundo_apellido}</td>
                            <td>{cliente.celular}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.cedula}</td>
                            <td>Acción</td>
                        </tr>
                    );
                  })}
                </tbody>
            </Table>
        </>
    )
}

export default TablaClientes;
