import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { CRMContext } from '../../context/CRMContext';


function NuevoProducto ({producto, props}) {
    // console.log(producto);
    // eslint-disable-next-line
    const [auth, guardarAuth] = useContext(CRMContext);


    if(auth.token === ''){
        // Redireccionar
        props.history.push('/iniciar-sesion');;
    } 
        // Eliminar Producto
    const eliminarProducto = id => {
        Swal.fire({
                title: '¿Estas Seguro?',
                text: "No se podra recuperar el producto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borralo!',
                cancelButtonText: 'No lo Borres!'
        }).then((result) => {
            if (result.value) {
                // Eliminar en la RESTAPI
                clienteAxios.delete(`/productos/${id}`, {
                    headers: {
                        'Content-Type' : 'multipart/form-data',
                        'Authorization' : `Bearer ${auth.token}`
                    }
                })
                    .then(res => {
                        if(res.status === 200) {// correcto. Se elimino
                         Swal.fire(
                                'Borrado!',
                                res.data.mensaje,
                                'success'
                        )
                        }
                    })
            }
        })
        

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
                <Link to={`/productos/editar/${_id}`}           className="btn btn-azul">   
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