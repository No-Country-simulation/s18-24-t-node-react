'use client'

import { useEffect } from 'react'

import { GridProperties } from '../components/GridProperties'
import { useProperties } from '../hooks/useProperties'
import { Banner } from '../ui/Banner'
import { Spinner } from '../ui/Spinner'
import marDePlataImage from './public/mardelplata.png'
import saltaImage from './public/salta.png'
import mendozaImage from './public/mendoza.png'
import buenoAiresImage from './public/buenosaires.png'
import Image from 'next/image'


const TOP_SEARCH = [
  {
    href: marDePlataImage,
    title: 'Mar de Plata',
    subTitle: '28 Alojamientos'
  },
  {
    href: saltaImage,
    title: 'Salta',
    subTitle: '28 Alojamientos'
  },
  {
    href: mendozaImage,
    title: 'Mendoza',
    subTitle: '28 Alojamientos'
  },
  {
    href: buenoAiresImage,
    title: 'Buenos Aires',
    subTitle: '28 Alojamientos'
  }
]

const Page = () => {

  const { getProperties, isLoading, properties } = useProperties()

  useEffect(() => {
    getProperties()
  }, [])

  return (
    <div className='space-y-20'>
      <section>
        <Banner />

        <div className='px-8 max-w-[1400px] m-auto'>
          <h2 className="font-roboto text-3xl text-slate-700 font-bold py-14">Destinos populares</h2>

          {(properties.length > 0 && !isLoading) && <GridProperties properties={properties} />}
          {isLoading && <Spinner />}

        </div>
      </section>

      <section className='px-8 max-w-[1400px] m-auto'>
        <h2 className="font-roboto text-3xl text-slate-700 font-bold py-14">Encontra los mejores alojamientos en los destinos mas buscados</h2>

        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {
            TOP_SEARCH?.map((place, index) => (

              <div key={index} className="border-2 border-[#5FA77780] rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer w-80 relative">

                <Image
                  src={place?.href}
                  width={500}
                  height={500}
                  alt={`Destino`}
                  className="object-cover h-96"
                />

                <div className='p-4 absolute bottom-0 text-slate-50'>
                  <h3 className="text-2xl font-bold">{place?.title}</h3>
                  <strong>{place?.subTitle}</strong>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      <section className='px-8 max-w-[1400px] m-auto'>
        <h2 className="font-roboto text-3xl text-slate-700 font-bold py-14">Preguntas frecuentes</h2>

        <div className='grid grid-cols-2 gap-4 max-w-[1000px] m-auto'>
          {
            Array(4).fill(null).map((_, index) => (
              <div key={index} className='flex gap-4 justify-between items-center bg-slate-100 border border-slate-200 shadow-md p-4 rounded-2xl'>
                <p>¿Puedo reservar sin registrarme?</p>

                <svg width="25" height="25" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="18.5" cy="19" r="18.5" fill="#111111" />
                  <path d="M24.5647 14.6371L18.3854 20.6705L12.3385 14.5043L10.4402 16.3618L18.3444 24.4396L26.4222 16.5354L24.5647 14.6371Z" fill="#F9F9F9" />
                </svg>

              </div>
            ))
          }
        </div>
      </section>
    </div >
  )
}

export default Page


