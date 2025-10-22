import { Table, Spinner } from "react-bootstrap";

const TablaEmpleados = ({ empleados, cargando }) => {

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
                        <th>ID Empleado</th>
                        <th>Primer Nombre</th>
                        <th>Segundo Nombre</th>
                        <th>Primer Apellido</th>
                        <th>Segundo Apellido</th>
                        <th>Celular</th>
                        <th>Cargo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado) => {
                        return (
                            <tr key={empleado.id_empleado}>
                                <td>{empleado.id_empleado}</td>
                                <td>{empleado.primer_nombre}</td>
                                <td>{empleado.segundo_nombre}</td>
                                <td>{empleado.primer_apellido}</td>
                                <td>{empleado.segundo_apellido}</td>
                                <td>{empleado.celular}</td>
                                <td>{empleado.cargo}</td>
                                <td>Acción</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default TablaEmpleados;