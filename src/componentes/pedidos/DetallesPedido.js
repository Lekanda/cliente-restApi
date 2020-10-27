import React from 'react';

function DetallesPedido({pedido, i}) {

    // console.log(pedido);
    
    const {cliente} = pedido;
    console.log(pedido.pedido);
    
    return(
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {cliente._id}</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedidos: </p>
                    <ul>
                        {pedido.pedido.map(articulos => (
                            <li key={pedido._id+articulos.producto._id}>
                                <p>{articulos.producto.nombre}</p>
                                <p>{articulos.producto.precio}</p>
                                <p>Cantidad: {articulos.cantidad}</p>
                            </li>
                        ))}
                            
                    </ul>
                </div>
                    <p className="total">Total: ${pedido.total} </p>
            </div>
            <div className="acciones">
                <button type="button" className="btn btn-rojo btn-eliminar">
                    <i className="fas fa-times"></i>
                                    Eliminar Pedido
                </button>
            </div>
        </li>
    )
}

export default DetallesPedido;