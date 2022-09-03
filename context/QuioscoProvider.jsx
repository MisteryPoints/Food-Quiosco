import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([]) 
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)


    const router = useRouter()
    
    const getCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)
    }

    useEffect(() => {
        getCategorias()
    }, [])

    useEffect(() => { 
        setCategoriaActual(categorias[0])
    }, [categorias]);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)  
        setTotal(nuevoTotal)
    }, [pedido]);

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if (pedido.some(productoState => productoState.id === producto.id)){
            //Si Pedido existe Actualizar la Cantidad
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
            toast('🍩   Guardado Correctamente 👌')
        } else {
            //Si Pedido no existe Crearlo..
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido ✔')
        }
        setModal(false)
    } 

    const handleEditarCant = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }
    
    const colocarOrden = async (e) => {
        e.preventDefault(

        )
        console.log(pedido)
        console.log(nombre)
        console.log(total)
    }

    return(
        <QuioscoContext.Provider value ={{
            categorias,
            categoriaActual,
            handleClickCategoria,
            producto,
            handleSetProducto,
            modal,
            handleChangeModal,
            pedido,
            handleAgregarPedido, 
            handleEditarCant,
            handleEliminarProducto,
            nombre,
            setNombre,
            colocarOrden,
            total
        }}>
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext