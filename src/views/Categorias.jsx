import {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import TablaCategorias from '../components/categorias/TablaCategorias';


const Categorias = () => {

    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerCategorias = async () =>{
        try{
            const respuesta = await fetch ('http://localhost:3000/api/categorias');
           
            if(!respuesta.ok){
                throw new Error('Error al obtener las categorias');
            }

            const datos = await respuesta.json();

            setCategorias(datos);
            setCargando(false);
        }catch (error) {
                console.log(error.message);
                setCargando(false);
        }
    }

    useEffect(() =>{
        obtenerCategorias();
    }, []);
    
    return (
        <>
        <Container className="mt-4">
            
        <h4>Categorias</h4>

        <TablaCategorias
         categorias={categorias}
          cargando={cargando}
        />

        </Container>
        </>
    )
}

export default Categorias;