import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TablaCompras from "../components/compras/TablaCompras";

const Compras = () => {

    const [compras, setCompras] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerCompras = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/compras');
            if (!respuesta.ok) {
                throw new Error('Error al obtener las compras');
            }

            const datos = await respuesta.json();
            setCompras(datos);
            setCargando(false);

        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerCompras();
    }, []);

    return (
        <>
            <Container className="mt-4">

                <h4>Compras</h4>
                <TablaCompras
                    compras={compras}
                    cargando={cargando}
                />

            </Container>
        </>
    );
}

export default Compras;