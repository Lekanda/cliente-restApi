import React from 'react';
import { Link } from 'react-router-dom';

function NuevoProducto ({producto}) {
    // console.log(producto);

    // Eliminar Producto
    const eliminarProducto = id => {
        console.log('Eliminando...', id);
        
    }


    const {_id, nombre, precio, imagen } = producto;

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre">{nombre}</p>
                <p className="precio">{precio} €</p>
                {imagen ? (
                    <img src={`http://localhost:2000/${imagen}`} alt="imagen" />
                ) : null }
            </div>
            <div className="acciones">
                <Link to={'/productos/editar/${_id}'} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Producto
                </Link>
                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(_id) }
                >
                    <i className="fas fa-times"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
    )
}

export default NuevoProducto;