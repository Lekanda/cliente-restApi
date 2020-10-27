import React, { useEffect, useState, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';

function Pedidos () {
    const [pedidos, guardarPedidos]= useState([]);
    // console.log(pedidos);

    useEffect(() => {
        const consultarAPI = async () => {
            // obtener los pedidos
            const resultado = await clienteAxios.get('/pedidos');
            guardarPedidos(resultado.data);
            // console.log(resultado);
        }
        consultarAPI();
    }, []);


    return (
        <Fragment>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                   {pedidos.map((pedido, index) => (
                       <DetallesPedido 
                            key={pedido._id}
                            pedido={pedido}
                            index={index}
                       />
                   ))} 
            </ul>
        </Fragment>
    )
}

export default Pedidos;