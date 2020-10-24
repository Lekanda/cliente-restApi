import React, {useState, Fragment} from 'react';


// Guardar Archivo




function NuevoProducto () {

    // producto = state ; guardarProducto = setState
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    }); 
    // archivo=state, guardarArchivo= setState
    const [archivo, guardarArchivo] = useState('');

    // Leer los datos del formulario
    const leerInformacionProducto = e => {
        // console.log([e.target.name]);
        // console.log(e.target);
        
       guardarProducto({
         ...producto,
            [e.target.name] : e.target.value
            
       })
    }

    // Colaca la imagen en el state
    const leerArchivo = e => {
        
        console.log(e);
        // guardarArchivo( e.target.files);
    }


    return (
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre" 
                        onChange={leerInformacionProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" 
                           name="precio"  
                           min="0.00" 
                           step="0.01" 
                           placeholder="Precio" 
                           onChange={leerArchivo}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  
                           name="imagen" 
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                            className="btn btn-azul" 
                            value="Agregar Producto" 
                    />
                </div>
            </form>
        </Fragment>
    )
}

export default NuevoProducto;