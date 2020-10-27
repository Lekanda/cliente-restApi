import React, { useEffect, useState, Fragment } from 'react';
// Importar cliente Axios
import clienteAxios from '../../config/axios';

import  Cliente from './Cliente';

import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';


function Clientes () {
    // Trabajar con el State
    // clientes = State
    // guardarClientes = Funcion para guardar el State
    const [clientes, guardarClientes] = useState([]);


    //Query a la API
    const consultarAPI = async() => {
        // console.log('Consultando...');
        const clientesConsulta = await clienteAxios.get('/clientes');
        console.log(clientesConsulta.data.clientes);

        // Colocar el resultado en el State
        guardarClientes(clientesConsulta.data.clientes);
    }

    //  Use effect es similar a componentdidmount y willmount
    // Cuando carga ejecuta consultarAPI()
    useEffect( () => {
        consultarAPI();
    }, [clientes] );


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

    // Spinner de carga
    if (!clientes.length) {
        return <Spinner />
    }

    return (
        <Fragment>
            <h2>Clientes</h2>
            {/* {console.log(clientes)} */}
            {/* {console.log(guardarClientes)} */}
            <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link >
            <ul className="listado-clientes">
                {createArray(clientes)}
            </ul>
        </Fragment>
    )
}

export default Clientes;