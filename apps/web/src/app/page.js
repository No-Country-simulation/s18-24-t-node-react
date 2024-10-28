'use client'

import { useEffect } from 'react'

import { GridProperties } from '../components/GridProperties'
import { useProperties } from '../hooks/useProperties'
import { Banner } from '../ui/Banner'
import { Spinner } from '../ui/Spinner'


const Page = () => {

  const { getProperties, isLoading, properties} = useProperties()

  useEffect(() => {
    getProperties()
  }, [])
  
  return (
    <section>
      <Banner />

      <div className='px-8 max-w-[1400px] m-auto pb-32'>
        <h2 className="font-roboto text-3xl text-slate-700 font-bold py-14">Destinos populares</h2>
        
        { (properties.length > 0 && !isLoading) && <GridProperties properties={properties}/>}
        { isLoading && <Spinner/>}

      </div>
    </section >
  )
}

export default Page