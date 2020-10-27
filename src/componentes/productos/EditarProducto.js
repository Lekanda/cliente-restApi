import React, {useState, useEffect, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner';



function EditarProducto (props) {

    // Obtener el Id del producto
    const { id } = props.match.params

    // producto = state; Y funcion para Actualizar producto
    const [ producto, guardarProducto ] = useState({
        nombre:'',
        precio:'',
        imagen:''
    });

    // archivo(imagen)=state, guardarArchivo= setState
    const [archivo, guardarArchivo] = useState('');

    
    //Cuando el componente carga
    useEffect(() => {
        // Consultar la API para traer el producto a editar
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.put(`/productos/${id}`);
            // console.log(productoConsulta.data);
            guardarProducto(productoConsulta.data);
        }

        consultarAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // edita uun producto en la db
    const editarProducto = async e => {
        e.preventDefault();

        // Crear un formData para subir los datos
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //Almacenarlo en la DB
        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            // console.log(res);

            // Alerta para producto creado
            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
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

    // extraer los valores del State
    const { nombre, precio, imagen } = producto;

    if(!nombre) return <Spinner />

    return (
        <Fragment>
            <h2>Editar Producto</h2>

            <form
                onSubmit={editarProducto}
            >
                <legend>Comprueba todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                           placeholder="Nombre Producto" 
                           name="nombre" 
                           onChange={leerInformacionProducto}
                           defaultValue={nombre}
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
                           defaultValue={precio}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    { imagen ? (
                        <img src={`http://localhost:2000/${imagen} `} alt="imagen" width="300" />
                    ) : null }
                    <input type="file"  
                           name="imagen"
                           onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" 
                            className="btn btn-azul" 
                            value="Editar Producto" 
                    />
                </div>
            </form>
        </Fragment>
    )
}

export default withRouter(EditarProducto);