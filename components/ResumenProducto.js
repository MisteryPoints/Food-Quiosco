import Image from "next/image"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

const ResumenProducto = ({producto}) => {
    const { handleEditarCant, handleEliminarProducto } = useQuiosco()


    return (
        <div className='shadow p-5 mb-3 flex gap-10 items-center'>
            <div className='md:w-1/6'>
                <Image width={300} height={400} alt={`Imagen Producto ${producto.nombre}`} src={`/assets/img/${producto.imagen}.jpg`} className={`rounded-lg`}/>
            </div>
            <div className='md:w-4/6'>
                <p className="text-3xl font-bold">{producto.nombre}</p>
                <p className="text-xl font-bold mt-2">Cantidad: {producto.cantidad}</p>
                <p className="text-xl text-amber-500 font-bold mt-2">Precio: {formatearDinero(producto.precio)}</p>
                <p className="text-sm text-gray-700 font-bold mt-2">Subtotal: {formatearDinero(producto.precio * producto.cantidad)}</p>
            </div>
            <div className='md:w-1/6'>
                <button type="button" className="bg-sky-700 flex px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full self-center hover:bg-sky-500" onClick={() => handleEditarCant(producto.id)}>✏      Editar</button>
                <button type="button" className="bg-red-700 flex px-5 py-2 text-white rounded-md font-bold uppercase shadow-md w-full self-center hover:bg-red-500 mt-3" onClick={() => handleEliminarProducto(producto.id)}>🗑    Eliminar</button>
            </div>
        </div>
    )
}

export default ResumenProducto