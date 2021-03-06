import React, { useContext} from 'react';
import { CRMContext } from '../../context/CRMContext';

function FormCantidadProducto (props) {
    const {producto, restarProductos, aumentarProductos, eliminarProductoPedido, index } = props;

     // Usar valores del context
    // eslint-disable-next-line
    const [auth, guardarAuth] = useContext(CRMContext);
    if(!auth.auth) return null;

    return(
        <li>
            <div className="texto-producto">
                <p className="nombre">{producto.nombre}</p>
                <p className="precio">{producto.precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i 
                        className="fas fa-minus"
                        onClick={() => restarProductos(index) }
                    ></i>

                    <p>{producto.cantidad}</p>

                    <i 
                        className="fas fa-plus"
                        onClick={() => aumentarProductos(index) }
                    ></i>
                </div>
                <button 
                    type="button" 
                    className="btn btn-rojo"
                    onClick={() => eliminarProductoPedido(producto._id)}// O producto.producto , es lo mismo
                    >
                    <i className="fasfa-minus-circle"></i>
                                    Eliminar Producto
                </button> 
            </div>
        </li>
    )
}

export default FormCantidadProducto;