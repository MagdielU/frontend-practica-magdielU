import React, {useState} from 'react';

const Contador = () => {

    const [contador, setContador] = useState(0);
    const Incrementar = () =>{
      setContador(contador + 1)
    }

    return(
        <>
        <h1>Contador: {contador}</h1>
        <button onClick={Incrementar}>
          Incrementar
        </button>
        </>
    );
}
export default Contador();