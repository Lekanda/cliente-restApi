import React, { Fragment, useState,useContext } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import { CRMContext } from '../../context/CRMContext';


function NuevoCliente({history}) {
     // Usar valores del context
    // eslint-disable-next-line
    const [auth, guardarAuth] = useContext(CRMContext);

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
        // console.log(cliente);
        // console.log([e.target.name] + ":" + e.target.value);
    }


    // Añade a  la RESTAPI un cliente nuevo
    const agregarCliente = e => {
        e.preventDefault();

        // Enviar peticion a xios
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                // console.log(res);
                // Validar sí hay errores de Mongo
                if(res.data.code === 11000) {
                    // console.log('Error de duplicado de Mongo');
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
                        'Cliente Guardado!',
                        res.data.mensaje,
                        'success'
                    )
                }
                // Redireccionar
                history.push('/');

            });
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

    // Verificar si el uusuario esta autenticado o no
    if(!auth.auth && (localStorage.getItem('token') === auth.token) ) {
        history.push('/iniciar-sesion');
    };



    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form 
                onSubmit={agregarCliente}
            >
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
export default withRouter(NuevoCliente);