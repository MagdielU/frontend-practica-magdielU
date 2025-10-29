import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TablaCompras from '../components/compras/TablaCompras';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

const Compras = () => {

    const [compras, setCompras] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [comprasFiltradas, setComprasFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");

    const obtenerCompras = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/compras');

            if (!respuesta.ok) {
                throw new Error('Error al obtener las compras');
            }

            const datos = await respuesta.json();

            setCompras(datos);
            setComprasFiltradas(datos);
            setCargando(false);

        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    };

    const manejarCambioBusqueda = (e) => {
        const texto = e.target.value.toLowerCase();
        setTextoBusqueda(texto);

        const filtradas = compras.filter(
            (compra) =>
                (compra.id_compra && compra.id_compra.toString().includes(texto)) ||
                (compra.id_empleado && compra.id_empleado.toString().includes(texto)) ||
                (compra.fecha_compra && compra.fecha_compra.toLowerCase().includes(texto)) ||
                (compra.total_compra && compra.total_compra.toString().includes(texto))
        );
        setComprasFiltradas(filtradas);
    };

    useEffect(() => {
        obtenerCompras();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Compras</h4>

                <Row className="mb-3">
                    <Col lg={5} md={8} sm={8} xs={7}>
                        <CuadroBusquedas
                            textoBusqueda={textoBusqueda}
                            manejarCambioBusqueda={manejarCambioBusqueda}
                        />
                    </Col>
                </Row>

                <TablaCompras
                    compras={comprasFiltradas}
                    cargando={cargando}
                />
            </Container>
        </>
    );
};

export default Compras;
