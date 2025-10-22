import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import TablaUsuarios from "../components/usuarios/TablaUsuarios";

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerUsuarios = async () => {
        try {
            const respuesta = await fetch('http://localhost:3000/api/usuarios');
            if (!respuesta.ok) {
                throw new Error('Error al obtener los usuarios');
            }

            const datos = await respuesta.json();
            setUsuarios(datos);
            setCargando(false);

        } catch (error) {
            console.log(error.message);
            setCargando(false);
        }
    }

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    return (
        <>
            <Container className="mt-4">
                <h4>Usuarios</h4>
                <TablaUsuarios
                    usuarios={usuarios}
                    cargando={cargando}
                />
            </Container>
        </>
    );
}

export default Usuarios;