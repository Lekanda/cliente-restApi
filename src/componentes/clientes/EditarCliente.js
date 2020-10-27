import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';
// import Cliente from './Cliente';


function EditarCliente(props) {
    // Obtener el ID
    const { id } = props.match.params;

    console.log(id);

    // Cliente = State
    //guardarCliente = funcion para guardar el State
    const[cliente, datosCliente]  = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    });


    // Query a la API
    const consultarAPI = async () => {
        const clienteconsulta = await clienteAxios.get(`/clientes/${id}`);
        console.log(clienteconsulta.data);
        
        // Colocar en el State
        datosCliente(clienteconsulta.data)
    }

    //useEffect , cuando el componente carga
    useEffect( () => {
        consultarAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // Leer los datosdel formulario
    const actualizarState = e => {
        // Almacenamos lo que el usuario escribe en el State
        datosCliente({
            // Obtener una copia del State actual
            ...cliente,
            [e.target.name] : e.target.value
        })
    };

    // Actualizar el cliente por Axios
    const actualizarCliente = e => {
        e.preventDefault();

        // Enviar peticion por Axios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                if(res.data.code === 11000) {
                    console.log('Error de duplicado de Mongo');
                    Swal.fire({
                        
                        title: 'Hubo un Error!',
                        text: 'El Cliente ya esta registrado',
                        icon: 'warning',
                        // imageUrl: 'https://unsplash.it/400/200',
                        // imageWidth: 200,
                        // imageHeight: 100,
                    })
                }else{
                    console.log(res.data);
                    Swal.fire(
                        'Correcto',
                        'Se actualizo correctamente',
                        'success'
                    )
                }

                // Redireccionar
                props.history.push('/');
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
            <form
                onSubmit={actualizarCliente}
            >
                    <legend>Actualiza los campos deseados</legend>
                    <div className="campo">
                        <label>Nombre:</label>
                        <input  type="text"
                                placeholder="Nombre Cliente" 
                                name="nombre" 
                                onChange={actualizarState}
                                value={cliente.nombre}
                        />
                    </div>

                    <div className="campo">
                        <label>Apellido:</label>
                        <input  type="text" 
                                placeholder="Apellido Cliente" 
                                name="apellido" 
                                onChange={actualizarState}
                                value={cliente.apellido}
                        />
                    </div>
                
                    <div className="campo">
                        <label>Empresa:</label>
                        <input  type="text" 
                                placeholder="Empresa Cliente" 
                                name="empresa" 
                                onChange={actualizarState}
                                value={cliente.empresa}
                        />
                    </div>

                    <div className="campo">
                        <label>Email:</label>
                        <input  type="email" 
                                placeholder="Email Cliente" 
                                name="email" 
                                onChange={actualizarState}
                                value={cliente.email}
                        />
                    </div>

                    <div className="campo">
                        <label>Teléfono:</label>
                        <input  type="tel" 
                                placeholder="Teléfono Cliente" 
                                name="telefono" 
                                onChange={actualizarState}
                                value={cliente.telefono}
                        />
                    </div>

                    <div className="enviar">
                            <input  type="submit" 
                                    className="btn btn-azul" 
                                    value="Editar Cliente"
                                    disabled={ validarCliente() } 
                    />
                    </div>
            </form>
        </Fragment>
    )
}

// HOC. Es un afuncion que toma uun componente y retorna un nuuevo componente
export default withRouter(EditarCliente);