'use client'

import { useEffect, useState } from "react"
import { GridProperties } from "../../components/GridProperties"
import { useProperties } from "../../hooks/useProperties"
import { InputSearch } from "../../ui/InputSearch"
import { Spinner } from "../../ui/Spinner"

const Page = () => {
  const { properties, getProperties, isLoading } = useProperties()

  const [rangeOfPrice, setRangeOfPrice] = useState(0)

  useEffect(() => {
    getProperties()
  }, [])

  const handleChange = (data) => {
    setRangeOfPrice(data.target.value)
  }

  return (
    <section className="flex gap-20 p-8">
      <div className="flex flex-col gap-4 bg-[#5FA77C82] p-8 rounded-2xl h-fit">

        <h2 className="text-xl">Filtros</h2>

        <label htmlFor="numberOfPeople">Capacidad</label>
        <select name="numberOfPeople" >
          <option></option>
        </select>

        <div className="space-x-4">
          <label htmlFor="price">Precio Mínimo</label>
          <span className="text-slate-950 font-semibold" >{rangeOfPrice}</span>
        </div>

        <input
          type="range"
          name="price"
          min={0}
          max={2000000}
          value={rangeOfPrice}
          onChange={handleChange}
        />

        <button
          className="bg-[#5FA77C82] py- rounded-2xl w-fit px-8 font-semibold text-slate-100 shadow-sm border border-slate-200 hover:cursor-pointer hover:bg-[#5FA77C82]/70 m-auto"
        >Filtrar</button>
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
