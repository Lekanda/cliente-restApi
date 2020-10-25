import React from 'react';

function FormBuscarProducto(props) {
    return(
        <form
            onSubmit = {props.buscarProducto}
        >
            <legend>Busca un Producto y agrega ucantidad</legend>
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