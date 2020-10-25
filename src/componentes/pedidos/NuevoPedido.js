import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';



function NuevoPedido(props) {
    // Extraer el ID de cliente
    const { id } = props.match.params;

    // State
    const [cliente, guardarCliente] = useState({});



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


    const buscarProducto = () => {

    }

    const leerDatosBusqueda = () => {

    }

    return (
        <Fragment>
            <h2>Nuevo Pedido</h2>

                <div class="ficha-cliente">
                    <h3>Datos de Cliente</h3>
                    <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                    <p>Tlf: {cliente.telefono}</p>
                </div>

                <FormBuscarProducto 
                    buscarProducto={buscarProducto}
                    leerDatosBusqueda={leerDatosBusqueda}
                />

                <ul class="resumen">
                    <li>
                        <div class="texto-producto">
                            <p class="nombre">Macbook Pro</p>
                            <p class="precio">$250</p>
                        </div>
                        <div class="acciones">
                            <div class="contenedor-cantidad">
                                <i class="fas fa-minus"></i>
                                <input type="text"name="cantidad" />
                                <i class="fas fa-plus"></i>
                            </div>
                            <button type="button" class="btnbtn-rojo">
                                <i class="fasfa-minus-circle"></i>
                                    Eliminar Producto
                            </button>
                        </div>
                    </li>
                </ul>
                    <div class="campo">
                        <label>Total:</label>
                        <input type="number" name="precio" placeholder="Precio" readonly="readonly" />
                    </div>
                    <div class="enviar">
                        <input type="submit" class="btn btn-azul" value="Agregar Pedido"/>
                    </div>
                
        </Fragment>
    )
}

export default NuevoPedido;