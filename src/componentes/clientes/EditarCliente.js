import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';


function EditarCliente(props) {
    // Obtener el ID
    const { id } = props.match.params;

    console.log(id);

    // Cliente = State
    //guaradrCliente = funcion para guardar el State
    const[cliente, guardarCliente]  = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });


    // Leer los datosdel formulario
    const actualizarState = e => {
        // Almacenamos lo que el usuario escribe en el State
        guardarCliente({
            // Obtener una copia del State actual
            ...cliente,
            [e.target.name] : e.target.value
        })
    }



    // Validar el Formulario
    const validarCliente = () => {
        // Destructuring al State
        const { nombre, apellido, email, empresa, telefono } = cliente;
        // Revisar que las propiedades del objeto tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;


        // Return true o false
        return valido;
    }
    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form>
                    <legend>Actualiza los campos deseados</legend>
                    <div className="campo">
                        <label>Nombre:</label>
                        <input  type="text" 
                                placeholder="Nombre Cliente" 
                                name="nombre" 
                                onChange={actualizarState}
                        />
                    </div>

                    <div className="campo">
                        <label>Apellido:</label>
                        <input  type="text" 
                                placeholder="Apellido Cliente" 
                                name="apellido" 
                                onChange={actualizarState}
                        />
                    </div>
                
                    <div className="campo">
                        <label>Empresa:</label>
                        <input  type="text" 
                                placeholder="Empresa Cliente" 
                                name="empresa" 
                                onChange={actualizarState}
                        />
                    </div>

                    <div className="campo">
                        <label>Email:</label>
                        <input  type="email" 
                                placeholder="Email Cliente" 
                                name="email" 
                                onChange={actualizarState}
                        />
                    </div>

                    <div className="campo">
                        <label>Teléfono:</label>
                        <input  type="tel" 
                                placeholder="Teléfono Cliente" 
                                name="telefono" 
                                onChange={actualizarState}
                        />
                    </div>

                    <div className="enviar">
                            <input  type="submit" 
                                    className="btn btn-azul" 
                                    value="Agregar Cliente"
                                    disabled={ validarCliente() } 
                    />
                    </div>
            </form>
        </Fragment>
    )
}

// HOC. Es un afuncion que toma uun componente y retorna un nuuevo componente
export default withRouter(EditarCliente);