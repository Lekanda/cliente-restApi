const eliminarProducto = id => { 
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Luego no hay vuelta atrás",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',            cancelButtonColor: '#d33',
        confirmButtonText: 'Si, elimínalo!'})
        .then((result) => {
            if (result.value) 
            {
            // llamado a axios
            clienteAxios.delete(`/productos/${id}`)
            .then(res => {
                Swal.fire(                    'Eliminado!',                    'El cliente se ha eliminado.',                    'success'                    
                )                
            })            
        }          
            
    })    
        }



            <button onClick={() => eliminarPedido(pedido._id)}   
                type="button"
                className="btn btn-rojo btn-eliminar">    
                <i className="fas fa-times"></i>    
                    Eliminar Pedido
            </button>


                useEffect(() => {
                    const consultarApi = async () => {
                    const resultado = await clienteAxios.get('pedidos');
                    guardarPedidos(resultado.data);
                    };
                    consultarApi();  }, [pedidos]);