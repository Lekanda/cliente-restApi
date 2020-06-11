import React, {useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';

function Productos () {
    // produuctos= state ; guaradrProduuctos= funcion para guardar el State
    const [productos, guardarProductos] = useState([]);

    // UseEffect para consultar la API cuando cargue
    useEffect( () => {
        // Query a la API
        const consultarAPI = async () => {
            const productosConsulta = await clienteAxios.get('/productos/');
            // console.log(productosConsulta.data.productos);
            guardarProductos(productosConsulta.data.productos); 
        }
        // llamada API
        consultarAPI();
    }, [productos]);// productos: para que actualice despues de borrar en API



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