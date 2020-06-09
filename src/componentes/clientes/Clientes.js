import React, { useEffect } from 'react';
// Importar cliente Axios
import clienteAxios from '../../config/axios';


function Clientes () {
    //Query a la API
    const consultarAPI = async() => {
        console.log('Consultando...');
        const clientesConsulta = await clienteAxios.get('/clientes');
        console.log(clientesConsulta);
    }

    //  Use effect es similar a componentdidmount y willmount
    useEffect( () => {
        consultarAPI();
    },[]);

    return (
        <h2>Clientes</h2>
    )
}

export default Clientes;