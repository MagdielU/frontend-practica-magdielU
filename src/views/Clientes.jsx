import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import TablaClientes from '../components/clientes/TablaClientes';



const Clientes = () => {

    const [clientes, setClientes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerClientes = async () =>{
        try{
            const respuesta = await fetch ('http://localhost:3000/api/clientes');
           
            if(!respuesta.ok){
                throw new Error('Error al obtener los clientes');
            }

            const datos = await respuesta.json();

            setClientes(datos);
            setCargando(false);
        }catch (error) {
                console.log(error.message);
                setCargando(false);
        }
    }

    useEffect(() =>{
        obtenerClientes();
    }, []);
    
    return (
        <>
        <Container className="mt-4">
            
        <h4>Clientes</h4>

        <TablaClientes
         clientes={clientes}
          cargando={cargando}
        />

        </Container>
        </>
    )
}

export default Clientes;