import React, { Fragment, useState } from 'react';

function NuevoCliente() {
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
        // console.log('Alguien escribe....');
        // console.log([e.target.value);
        // Almacenamos lo que el usuario escribe en el State
        guardarCliente({
            // Obtener una copia del State actual
            ...cliente,
            [e.target.name] : e.target.value
        })
        console.log(cliente);
        // console.log([e.target.name] + ":" + e.target.value);
    }


    // Validar el Formulario
    const validarCliente = () => {
        // Destructuring al State
        const { nombre, apellido, email, empresa, telefono } = cliente;
        // Revisar que las propiedades del objeto tengan contenido
        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;
        


        // Return truue o false
        return valido;
    }
    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form >
                    <legend>Llena todos los campos</legend>
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
                        <input  type="email" 
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

export default NuevoCliente;