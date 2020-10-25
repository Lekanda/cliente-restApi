import React, { useState, useEffect, Fragment } from 'react';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import FormCantidadProducto from './FormCantidadProducto';
import Swal from 'sweetalert2';



function NuevoPedido(props) {
    // Extraer el ID de cliente
    const {id} = props.match.params;

    // State
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState('');
    const [productos, guardarProductos] = useState([]);


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
            // console.log(resultadoBusqueda.data[0]);
            let productoResultado = resultadoBusqueda.data[0];
            // Agregar la llave "Producto" ( Copia de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            // console.log(productoResultado);

            // Ponerlo en el State
            guardarProductos([...productos, productoResultado])

        }else {
            // No hay resultados
            Swal.fire({
                type: 'error',
                title: 'No hay resultados',
                text:'No hay resultados'
            })
        }

        // console.log(resultadoBusqueda);
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
                    {productos.map((producto,index) => (
                        <FormCantidadProducto />
                    ))}
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