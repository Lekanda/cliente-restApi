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
    })

    
    //Cuando el componente carga
    useEffect(() => {
        // Consultar la API para traer el producto a editar
        const consultarAPI = async () => {
            const productoConsulta = await clienteAxios.get(`/productos/${id}`);
            console.log(productoConsulta.data);
            guardarProducto(productoConsulta.data);
        }

        consultarAPI();
    }, [])

    return (
        <h2>Editar Producto</h2>
    )
}

export default EditarProducto;