import React from 'react';


function Login () {

    const leerDatos = () => {
        
    }


    return(
        
        <div className="login">
            <h2>Iniciar Sesion</h2>

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
                <form>
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
                </form>
            </div>

            <input type="submit" value="Iniciar Sesion" className="btn btn-verde btn-block" />
        </div>
    )
}

export default Login;