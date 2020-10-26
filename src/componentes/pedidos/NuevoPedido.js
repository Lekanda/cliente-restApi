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
    const [total, guardarTotal] = useState(0);


    useEffect( () => {
        // Obtener el cliente
        const consultarAPI = async () => {
            // Consultar el cliente actual
            const resultado = await clienteAxios.get(`/clientes/${id}`);
            // console.log(resultado.data);
            guardarCliente(resultado.data);
        }

        // Llamar a la API
        consultarAPI();

        // Actualizar el total a pagar
        actualizarTotal();
    }, [productos]);


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

    // Actualizar la cantidad de productos
    const restarProductos = i => {
        // console.log('uno menos ...', i);
        // console.log(productos);

        // copiar el arreglo original de productos
        const todosProductos = [...productos];
        // Validar si esta en 0; En este caso no puede ir mas alla
        if(todosProductos[i] === 0) return;
        // Decremento
        todosProductos[i].cantidad--;
        // Almacenar en el State
        guardarProductos(todosProductos);
    }
    const aumentarProductos = i => {
        // console.log('uno mas ...', i);
        // console.log(productos);

        // Copiar el arreglo para no cambiar el original
        const todosProductos = [...productos];
        // Incremento
        todosProductos[i].cantidad++;
        // Almacenar en el State
        guardarProductos(todosProductos);
    }

    // Elimina un producto del state****
    const eliminarProductoPedido = id => {
        // console.log(id);


        // !== guarda los demas que no coinciden;  === guarda el que coincide
        const todosProductos = productos.filter(producto => producto.producto !== id);

        guardarProductos(todosProductos);
    }

    // Actualizar el total a pagar
    const actualizarTotal = () => {
        // Sí el arreglo de producto es igual a 0: El total es 0
        if(productos.length === 0) {
            guardarTotal(0);
            return;
        }

        // Calcular el nuevo total
        let nuevoTotal=0;
        // Recorrer todos los productos , sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio) );
        // Almacenar el total
        guardarTotal(nuevoTotal);
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
                        <FormCantidadProducto 
                            key={producto.producto}
                            producto={producto}
                            restarProductos={restarProductos}
                            aumentarProductos={aumentarProductos}
                            eliminarProductoPedido={eliminarProductoPedido}
                            index={index}
                        />
                    ))}
                </ul>
                    
                    <p className="total">Total a pagar: <span>${total}</span></p>
                        
                    { total > 0 ? (
                        <form>
                            <input type = "submit"
                                   className= "btn btn-verde btn-block"
                                   value= "Realizar pedido" />

                        </form>
                    ) : null}
                
        </Fragment>
    )
}

export default NuevoPedido;