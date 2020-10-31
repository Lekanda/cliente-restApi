import React, {useEffect, useState, useContext, Fragment} from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';
import { CRMContext } from '../../context/CRMContext';

function Productos (props) {
    // produuctos= state ; guaradrProduuctos= funcion para guardar el State
    const [productos, guardarProductos] = useState([]);

    // Usar valores del context
    // eslint-disable-next-line
    const [auth, guardarAuth] = useContext(CRMContext);

    // UseEffect para consultar la API cuando cargue
    useEffect( () => {
      if(auth.token !== '') {
        // Query a la API
        const consultarAPI = async () => {
            try {
              const productosConsulta = await clienteAxios.get('/productos' , {
                headers : {
                  Authorization : `Bearer ${auth.token}`
                }
              });
              // console.log(productosConsulta.data.productos);
              guardarProductos(productosConsulta.data.productos); 
            } catch (error) {
              // Error con autorizacion
              if(error.response.status === 500) {
                props.history.push('/iniciar-sesion');
            }
            }
        }
        // llamada API
        consultarAPI();
      } else {
        props.history.push('/iniciar-sesion');
      }    
    }, [productos]);// productos: para que actualice despues de borrar en API


    // Si el State esta como false
    if(!auth.auth) {
      props.history.push('/iniciar-sesion');
    }


    //
    function createArray(productos) {
        if (productos && productos.length > 0) {
          return productos.map(producto => (
            
              <Producto 
                key={producto._id}
                producto={producto}
              />
          ));
        }
        return [];
      }

      // Spinner de carga
      if (!productos.length) {
        return <Spinner />
      }

    return (
        <Fragment>
                <h2>Productos</h2>

                <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> 
                    <i className="fas fa-plus-circle"></i>
                    Nuevo Producto
                </Link>

                <ul className="listado-productos">
                    {createArray(productos)}
                </ul>
        </Fragment>
    )
}

export default Productos;