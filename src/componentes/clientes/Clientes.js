import React, { useEffect, useState, Fragment, useContext } from 'react';
// Importar cliente Axios
import clienteAxios from '../../config/axios';

import  Cliente from './Cliente';

import { Link, withRouter } from 'react-router-dom';
import Spinner from '../layout/Spinner';

import { CRMContext } from '../../context/CRMContext';


function Clientes (props) {
    // Trabajar con el State
    // clientes = State
    // guardarClientes = Funcion para guardar el State
    const [clientes, guardarClientes] = useState([]);

    // Usar valores del context
    // eslint-disable-next-line
    const [auth, guardarAuth] = useContext(CRMContext);


    //  Use effect es similar a componentdidmount y willmount
    // Cuando carga ejecuta consultarAPI()
    useEffect( () => {
        if(auth.token !== '') {
            //Query a la API
            const consultarAPI = async() => {
                try {

                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers : {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
                    // Colocar el resultado en el State
                    guardarClientes(clientesConsulta.data.clientes);

                } catch (error) {
                    // console.log(error);
                    // Error con autorizacion
                    if(error.response.status === 500) {
                        props.history.push('/iniciar-sesion');
                    }
                }
                }
                consultarAPI();
        }else {
            props.history.push('/iniciar-sesion');
        }
    // eslint-disable-next-line
    }, [clientes] );

    // Si el State esta como false
    if(!auth.auth) {
        props.history.push('/iniciar-sesion');
    }


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

export default withRouter (Clientes);