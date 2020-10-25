import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import Swal from 'sweetalert2';



function NuevoPedido(props) {
    // Extraer el ID de cliente
    const { id } = props.match.params;

    // State
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');




    useEffect( () => {
        // Obtener el cliente
        const consultarAPI = async () => {
            // Consultar el cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            console.log(resultado.data);
            guardarCliente(resultado.data);
        }

        // Llamar a la API
        consultarAPI();


    }, []);


    const buscarProducto = async e => {
        e.preventDefault();

        // Obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`);

        // Sí no hay resultado en la busqueda una alerta, si no, agregarlo al State
        if(resultadoBusqueda.data[0]) {

        }else {
            // No hay resultados
            Swal.fire({
                type: 'error',
                title: 'No hay resultados',
                text:'No hay resultados'
            })
        }

        console.log(resultadoBusqueda);
    }
    // Almacena una busqueda en el State
    const leerDatosBusqueda = e => {
        guardarBusqueda(e.target.value);
    }

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

                <div className="ficha-cliente">
                    <h3>Datos de Cliente</h3>
                    <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                    <p>Tlf: {cliente.telefono}</p>
                </div>

                <FormBuscarProducto 
                    buscarProducto={buscarProducto}
                    leerDatosBusqueda={leerDatosBusqueda}
                />

                <ul className="resumen">
                    <li>
                        <div className="texto-producto">
                            <p className="nombre">Macbook Pro</p>
                            <p className="precio">$250</p>
                        </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i className="fas fa-minus"></i>
                                <input type="text"name="cantidad" />
                                <i className="fas fa-plus"></i>
                            </div>
                            <button type="button" className="btnbtn-rojo">
                                <i className="fasfa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                        </div>
                    </li>
                </ul>
                    <div className="campo">
                        <label>Total:</label>
                        <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
                    </div>
                    <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Agregar Pedido"/>
                    </div>
                
        </Fragment>
    )
}

export default NuevoPedido;