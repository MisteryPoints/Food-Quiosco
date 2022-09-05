import { useEffect, useCallback } from "react"
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers"
import Layout from "../components/Layout"


export default function Total() {
    const { pedido, nombre, setNombre, colocarOrden, total } = useQuiosco()

    const comprobarPedido = useCallback(() => {
        return pedido.length === 0 || nombre === '' || nombre.length < 3
    }, [pedido, nombre])

    useEffect(() => { 
        comprobarPedido()
    }, [pedido, comprobarPedido])


    return ( 
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirmar tu Pedido a continuación</p>
            <form onSubmit={colocarOrden}>
                <div>
                    <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Nombre</label>
                    <input type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} className="bg-gray-200 w-full mt-3 lg:w-1/3 p-2 rounded-md" />
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar {``} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>
                <div className="mt-2">
                    <input type="submit" value='Confirmar Pedido' className={`${comprobarPedido() ? 'bg-indigo-100 cursor-not-allowed': 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} w-full lg:w-auto px-5 py-2 rounded-lg uppercase font-bold text-white text-center`}  disabled={comprobarPedido()}/>
                </div>
            </form>
        </Layout>
    )
} 