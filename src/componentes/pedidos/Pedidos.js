import React, { useEffect, useState, useContext, Fragment} from 'react';
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';
import { CRMContext } from '../../context/CRMContext';


function Pedidos (props) {
    const [pedidos, guardarPedidos]= useState([]);
    // console.log(pedidos);

    // Usar valores del context
    // eslint-disable-next-line
    const [auth, guardarAuth] = useContext(CRMContext);

    useEffect( () => {
        if(auth.token !== '') {
            const consultarAPI = async () => {
                try {
                    // obtener los pedidos
                    const resultado = await clienteAxios.get('/pedidos', {
                        headers : {
                          'Authorization' : `Bearer ${auth.token}`
                        }
                    });
                    guardarPedidos(resultado.data);
                    // console.log(resultado);
                } catch (error) {
                    // Error con autorizacion
                    if(error.response.status === 500) {
                    props.history.push('/iniciar-sesion');
                    }
                }
            }
        consultarAPI()
        } else {
            props.history.push('/iniciar-sesion');
        }
        // eslint-disable-next-line
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





 