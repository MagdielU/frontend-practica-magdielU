import {useState} from "react";
import { Table, Spinner } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaClientes = ({ clientes, cargando }) => {

    const [orden, setOrden] = useState({ campo: "id_clientes", direccion: "asc" });
    
        const manejarOrden = (campo) => {
            setOrden((prev) => ({
                campo,
                direccion:
                    prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
            }));
        };
    
        const clientesOrdenados = [...clientes].sort((a, b) => {
            const valorA = a[orden.campo];
            const valorB = b[orden.campo];
    
            if (typeof valorA === "number" && typeof valorB === "number") {
                return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
            }
    
            const comparacion = String(valorA).localeCompare(String(valorB));
            return orden.direccion === "asc" ? comparacion : -comparacion;
        });

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
                        <BotonOrden campo="id_usuario" orden={orden} manejarOrden={manejarOrden}>
                            ID Empleado
                        </BotonOrden>

                        <BotonOrden campo="primer_nombre" orden={orden} manejarOrden={manejarOrden}>
                            primer nombre
                        </BotonOrden>

                        <BotonOrden campo="segundo_nombre" orden={orden} manejarOrden={manejarOrden}>
                            segundo nombre
                        </BotonOrden>

                        <BotonOrden campo="primer_apellido" orden={orden} manejarOrden={manejarOrden}>
                            primer apellido
                        </BotonOrden>

                        <BotonOrden campo="segundo_apellido" orden={orden} manejarOrden={manejarOrden}>
                            segundo apellido
                        </BotonOrden>

                        <BotonOrden campo="Celular" orden={orden} manejarOrden={manejarOrden}>
                            Celular
                        </BotonOrden>

                        <BotonOrden campo="Dirección" orden={orden} manejarOrden={manejarOrden}>
                            Dirección
                        </BotonOrden>

                        <BotonOrden campo="Cédula" orden={orden} manejarOrden={manejarOrden}>
                            Cedula
                        </BotonOrden>
                    </tr>
                </thead>
                <tbody>
                  {clientesOrdenados.map((cliente) => {
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
