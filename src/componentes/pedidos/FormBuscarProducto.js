import React, { useContext } from 'react';
import { CRMContext } from '../../context/CRMContext';

function FormBuscarProducto(props) {


    // eslint-disable-next-line
    const [auth, guardarAuth] = useContext(CRMContext);

    if(auth.token === ''){
        props.history.push('/iniciar-sesion');
    }


    return(
        <form
            onSubmit = {props.buscarProducto}
        >
            <legend>Busca un Producto y agrega una cantidad</legend>
            <div className="campo">
                <label>Productos:</label>
                <input 
                    type="text" 
                    placeholder="Introduce un nombre de Articulo" 
                    name="productos" 
                    onChange={props.leerDatosBusqueda}
                />
            </div>

            <input
                type="submit"
                className="btn btn-azul btn-block"
                value="Buscar Producto"
            />

        </form>
    )
}

export default FormBuscarProducto;