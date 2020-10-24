import React, {useState, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter} from 'react-router-dom';


function NuevoProducto (props) {

    // producto = state ; guardarProducto = setState
    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: ''
    }); 
    // archivo(imagen)=state, guardarArchivo= setState
    const [archivo, guardarArchivo] = useState('');

    // Almacena el nuevo Producto en la DB y sube la imagen a la vez
    const agregarProducto = async e => {
        e.preventDefault();

        // Crear un formData para subir los datos
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //Almacenarlo en la DB
        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            // console.log(res);

            // Alerta para producto creado
            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }

            // Redireccionar
            props.history.push('/productos');

        } catch (error) {
            console.log(error);
            // Lanza la alerta
            Swal.fire({
                type:'error',
                title:'Hubo un error',
                text:'Vuelva a intentarlo'
            })
        }
    }
    // Leer los datos del formulario
    const leerInformacionProducto = e => {
        // console.log([e.target.name]);
        // console.log(e.target);
       guardarProducto({
            // Obtener una copia del state y agregar el nuevo
            ...producto,
            [e.target.name] : e.target.value
            
       })
       // console.log(producto);
    }

    // Colaca la imagen en el state
    const leerArchivo = e => {
        // console.log(e.target.files);
        guardarArchivo( e.target.files[0]);
    }

    return (
        <Fragment>
            <h2>Nuevo Producto</h2>

            <form
                onSubmit={agregarProducto}
            >
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
                           step="0.10" 
                           placeholder="Precio" 
                           onChange={leerInformacionProducto}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  
                           name="imagen"
                           onChange={leerArchivo}
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

export default withRouter(NuevoProducto);