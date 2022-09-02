import useQuiosco from '../hooks/useQuiosco'
import Layout from '../layout/layout' 

export default function Home() { 
  const { categoriaActual } = useQuiosco()
  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre ? categoriaActual.nombre : ''}`}>
      <h1 className='text-4xl font-black'>{categoriaActual?.nombre ? categoriaActual.nombre : ''}</h1>
      <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación</p>
    </Layout>
  )
} 