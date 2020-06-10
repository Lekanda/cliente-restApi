import React, { useEffect, useState, Fragment } from 'react';
// Importar cliente Axios
import clienteAxios from '../../config/axios';

import  Cliente from './Cliente';
function Clientes () {
    // Trabajar con el State
    // clientes = State
    // guardarClientes = Funcion para guardar el State
    const [clientes, guardarClientes] = useState([]);


    //Query a la API
    const consultarAPI = async() => {
        // console.log('Consultando...');
        const clientesConsulta = await clienteAxios.get('/clientes');
        // console.log(clientesConsulta.data.clientes);

        // Colocar el resultado en el State
        guardarClientes(clientesConsulta.data.clientes);
    }

    //  Use effect es similar a componentdidmount y willmount
    useEffect( () => {
        consultarAPI();
    }, [] );


    function createArray(clientes) {
        if (clientes && clientes.length > 0) {
          return clientes.map(cliente => (
            
              <Cliente 
                key={cliente._id}
                cliente={cliente}
              />
          ));
        }
        return [];
      }



    return (
        <Fragment>
            <h2>Clientes</h2>
            {/* {console.log(clientes)} */}
            {/* {console.log(guardarClientes)} */}
            
            <ul className="listado-clientes">
                {createArray(clientes)}
            </ul>
        </Fragment>
    )
}

export default Clientes;