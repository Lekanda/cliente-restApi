import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter } from 'react-router-dom';

// Context
import { CRMContext } from '../../context/CRMContext';


function Login (props) {

    // Auth y token
    // eslint-disable-next-line
    const [auth, guardarAuth] = useContext(CRMContext);
    // console.log(auth);
    // console.log(guardarAuth);

    // State con los datos del formuulario
    const [credenciales, guardarCredenciales] = useState({});

    // Iniciar Sesion en el Servidor
    const iniciarSesion = async e => {
        e.preventDefault();

        //Autenticar aL usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales);
            // console.log(respuesta);

            // Extraer el Token y colocarlo en localstorage
            const { token } = respuesta.data;
            localStorage.setItem('token', token);

            // Colocarlo en el State
            guardarAuth({
                token:token,
                auth:true
            });

            // Lanzar una alerta
            Swal.fire(
                'Login Correcto',
                'Has iniciado sesion',
                'success'
            )

            // Redireccionar
            props.history.push('/')
            

        } catch (error) {
            if(error.response) {
                Swal.fire({
                    type:'error',
                    title: 'Hubo un error',
                    text: error.response.data.mensaje
                })
            } else {
                Swal.fire({
                    type:'error',
                    title: 'Hubo un error',
                    text: 'Hubo un error'
                })
            }
            
        }
    }

    // Almacenar lo que usuario escribe en el State
    const leerDatos = e => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    
    return(
        
        <div className="login">
            <h2>Iniciar Sesion </h2>

            <div className="contenedor-formulario">
                <form>
                    <div className="campo">
                        <label>Email</label>
                        <input 
                            type="text"
                            name="email"
                            placeholder="Email para Iniciar Sesion"
                            required
                            onChange={leerDatos}
                        />
                    </div>
                </form>
            </div>

            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >
                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Password para Iniciar Sesion"
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <input type="submit" value="Iniciar Sesion" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    )
}


export default withRouter(Login);