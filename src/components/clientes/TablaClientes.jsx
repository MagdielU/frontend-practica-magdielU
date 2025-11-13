import { useState } from "react";
import { Table, Spinner, Button } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";
import Paginacion from "../ordenamiento/Paginacion";

const TablaClientes = ({
  clientes,
  cargando,
  abrirModalEdicion,
  abrirModalEliminacion,
  totalElementos,
  elementosPorPagina,
  paginaActual,
  establecerPaginaActual,
}) => {
  const [orden, setOrden] = useState({ campo: "id_cliente", direccion: "asc" });

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

    const comparacion = String(valorA || "").localeCompare(String(valorB || ""));
    return orden.direccion === "asc" ? comparacion : -comparacion;
  });

  if (cargando) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
    );
  }

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <BotonOrden campo="id_cliente" orden={orden} manejarOrden={manejarOrden}>
              ID
            </BotonOrden>

            <BotonOrden campo="primer_nombre" orden={orden} manejarOrden={manejarOrden}>
              Primer Nombre
            </BotonOrden>

            <BotonOrden campo="primer_apellido" orden={orden} manejarOrden={manejarOrden}>
              Primer Apellido
            </BotonOrden>

            <BotonOrden campo="cedula" orden={orden} manejarOrden={manejarOrden}>
              Cédula
            </BotonOrden>

            <BotonOrden campo="celular" orden={orden} manejarOrden={manejarOrden}>
              Celular
            </BotonOrden>

            <BotonOrden campo="direccion" orden={orden} manejarOrden={manejarOrden}>
              Dirección
            </BotonOrden>

            <th>Acción</th>
          </tr>
        </thead>

        <tbody>
          {clientesOrdenados.length > 0 ? (
            clientesOrdenados.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>
                  {cliente.primer_nombre} {cliente.segundo_nombre}
                </td>
                <td>
                  {cliente.primer_apellido} {cliente.segundo_apellido}
                </td>
                <td>{cliente.cedula}</td>
                <td>{cliente.celular}</td>
                <td>{cliente.direccion}</td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => abrirModalEdicion(cliente)}
                  >
                    <i className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => abrirModalEliminacion(cliente)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No hay clientes registrados
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={totalElementos}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </>
  );
};

export default TablaClientes;