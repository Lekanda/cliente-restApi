import React, {useEffect, useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../../config/axios';

function Productos () {
    // produuctos= state ; guaradrProduuctos= funcion para guardar el State
    const [productos, guardarProductos] = useState([]);

    // UseEffect para consultar la API cuando cargue
    useEffect( () => {
        // Query a la API
        const consultarAPI = async () => {
            const productosConsulta = await clienteAxios.get('/productos/');
            // console.log(productosConsulta);
            guardarProductos(productosConsulta); 
        }
        // llamada API
        consultarAPI();
    }, []);



    return (
        <Fragment>
                <h2>Productos</h2>

                <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> 
                    <i className="fas fa-plus-circle"></i>
                    Nuevo Producto
                </Link>

                <ul className="listado-productos">
                    <li className="producto">
                        <div className="info-producto">
                            <p className="nombre">VueJS</p>
                            <p className="precio">$25.00 </p>
                            <img src="img/1.jpg" />
                        </div>
                        <div className="acciones">
                            <Link to={'/productos/editar'} className="btn btn-azul">
                                <i className="fas fa-pen-alt"></i>
                                Editar Producto
                            </Link>

                            <button type="button" className="btn btn-rojo btn-eliminar">
                                <i className="fas fa-times"></i>
                                Eliminar Cliente
                            </button>
                        </div>
                    </li>
                </ul>
        </Fragment>
    )
}

export default Productos;