import {useState} from "react";
import { Table, Spinner, Image } from "react-bootstrap";
import BotonOrden from "../ordenamiento/BotonOrden";

const TablaProductos = ({ productos, cargando }) => {

    const [orden, setOrden] = useState({ campo: "id_producto", direccion: "asc" });

    const manejarOrden = (campo) => {
        setOrden((prev) => ({
            campo,
            direccion:
                prev.campo === campo && prev.direccion === "asc" ? "desc" : "asc",
        }));
    };

    const productosOrdenados = [...productos].sort((a, b) => {
        const valorA = a[orden.campo];
        const valorB = b[orden.campo];

        if (typeof valorA === "number" && typeof valorB === "number") {
            return orden.direccion === "asc" ? valorA - valorB : valorB - valorA;
        }

        const comparacion = String(valorA).localeCompare(String(valorB));
        return orden.direccion === "asc" ? comparacion : -comparacion;
    });

    if (cargando) {
        return (
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
                        <BotonOrden campo="id_producto" orden={orden} manejarOrden={manejarOrden}>
                            ID Producto
                        </BotonOrden>

                        <BotonOrden campo="nombre_producto" orden={orden} manejarOrden={manejarOrden}>
                            Nombre
                        </BotonOrden>

                        <BotonOrden campo="descripcion_producto" orden={orden} manejarOrden={manejarOrden}>
                            Descripción
                        </BotonOrden>

                        <BotonOrden campo="id_categoria" orden={orden} manejarOrden={manejarOrden}>
                            ID Categoría
                        </BotonOrden>

                        <BotonOrden campo="precio_unitario" orden={orden} manejarOrden={manejarOrden}>
                            Precio Unitario
                        </BotonOrden>

                        <BotonOrden campo="stock" orden={orden} manejarOrden={manejarOrden}>
                            Stock
                        </BotonOrden>

                        <BotonOrden campo="imagen" orden={orden} manejarOrden={manejarOrden}>
                            Imagen
                        </BotonOrden>

                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosOrdenados.map((producto) => {
                        return (
                            <tr key={producto.id_producto}>
                                <td>{producto.id_producto}</td>
                                <td>{producto.nombre_producto}</td>
                                <td>{producto.descripcion_producto}</td>
                                <td>{producto.id_categoria}</td>
                                <td>{producto.precio_unitario}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    {producto.imagen ? (
                                        <Image
                                            src={producto.imagen}
                                            alt={producto.nombre_producto}
                                            width="60"
                                            height="60"
                                            rounded
                                        />
                                    ) : (
                                        "Sin imagen"
                                    )}
                                </td>
                                <td>Acción</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
};

export default TablaProductos;