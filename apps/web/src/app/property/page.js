'use client'

import { useEffect } from "react"
import { GridProperties } from "../../components/GridProperties"
import { useProperties } from "../../hooks/useProperties"
import { InputSearch } from "../../ui/InputSearch"
import { Spinner } from "../../ui/Spinner"

const Page = () => {
  const { properties, getProperties, isLoading } = useProperties()

  useEffect(() => {
    getProperties()
  }, [])

  return (
    <section className="flex gap-20 p-8">
      <div className="flex flex-col gap-4 bg-[#5FA77C82] p-8 rounded-2xl h-fit">

        <h2 className="text-xl">Filtrar</h2>

        <label htmlFor="numberOfPeople">Capacidad</label>
        <select name="numberOfPeople" value={'Seleccione'} id="">
          <option value=""></option>
        </select>

        <label htmlFor="price">Precio</label>
        <input type="range" name="price" min={0} />
      </div>

      <div className="flex flex-col gap-10 justify-center items-center w-full h-full">
        <InputSearch />

        { (properties.length > 0 && !isLoading) && <GridProperties properties={properties}/>}
        { isLoading && <Spinner/>}
      </div>
    </section>
  )
}

export default Page
