import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';



function Cliente({cliente}) {
    // console.log(cliente .nombre);

    // Extraer los valores
    const { _id, nombre, apellido, empresa, email, telefono} = cliente;
    
    // Eliminar Cliente
    const eliminarCliente = idCliente => {
        // console.log('Eliminado...',id);
        Swal.fire({
            title: 'Estas Seguro?',
            text: "No se podra recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borralo!',
            cancelButtonText: 'Cancelar!'
          }).then((result) => {
            if (result.value) {
            // LLamar a Axios para eliminar
                clienteAxios.delete(`/clientes/${idCliente}`)
                    .then(res => {
                        // console.log(res);
                        Swal.fire(
                            'Eliminado!',
                            res.data.mensaje,
                            'success'
                        );
                    })
            }
          });
    };

    
    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>Tel: {telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>

                <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                    <i className="fas fa-plus"></i>
                    Nuevo Pedido
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(_id)}// El () del _id es para que se ejecute inmediatamente
                    // La arrow function de este ejemplo hace que solo se ejecute al presionar.
                    // Sin la Arrow function con el parentesis  ejecuta todo lo que hay inmediatamente y da 5 veces la funcion
                    // sin pasar la variable _id no podemos decirle a la funcion que tiene que borrar
                >

                    <i className="fab fa-aws"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )




} 
export default Cliente;