'use client'

import Image from "next/image"
import BannerImage from '../public/fondohome.png'
import { SearchIcon } from '../ui/icons/SearchIcon'
import { DropDown } from "../components/DropDown"
import { useState } from "react"
import Datepicker from "react-tailwindcss-datepicker"

export const Banner = () => {
  const [searchValues, setSearchValues] = useState({})

  const closeItem = () => {
    const elem = document.activeElement;

    if (elem) {
      elem?.blur();
    }
  };

  const handleClick = (value) => {
    setSearchValues({ ...searchValues, ...value })
    closeItem()
  }

  const handleInputFocus = () => {
    const input = document.getElementById('datepicker');
    if (input) {
      input.focus()
    }
  }

  console.log(searchValues)

  const DESTINATIONS = ['Flexible', 'Europa', 'Argentina', 'Estados Unidos', 'Brasil', 'America Central']

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Banner */}
      <Image
        className='w-full h-[500px] object-cover'
        src={BannerImage}
        alt="Hero"
      />

      <h2
        className="text-white text-3xl lg:text-5xl absolute top-14"
      >
        Encuentra tu lugar ideal
      </h2>

      {/* Banner content */}
      <div className="flex justify-between items-center gap-2 bg-slate-50 w-[600px] h-[90px] absolute top-32 rounded-full px-8 shadow-2xl border border-slate-900 text-center">

        {/* Destinations dropdown */}
        <DropDown title={searchValues?.origin ?? 'Explora destinos'}>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-80 p-2 shadow grid grid-cols-3 bottom-[-140px]"
          >
            {
              DESTINATIONS?.map((title, index) => (
                <li key={index} onClick={() => handleClick({ origin: title })}>
                  <a>{title}</a>
                </li>
              ))
            }
          </ul>
        </DropDown>

        {/* Datepicker */}
        <div
          onClick={handleInputFocus}
          className="flex flex-col justify-center text-start hover:cursor-pointer hover:bg-slate-200/50 rounded-full px-4 h-full ml-auto"
        >
          <h3 className="text-slate-800 font-semibold">Desde - Hasta</h3>

          <Datepicker
            readOnly
            inputId="datepicker"
            useRange={false}
            toggleClassName={'hidden'}
            placeholder="Agregar fechas"
            inputClassName='text-slate-500 bg-transparent placeholder:text-slate-500 outline-none hover:cursor-pointer'
            value={{ startDate: searchValues?.startDate, endDate: searchValues?.endDate, }}
            onChange={newValue => setSearchValues({ ...searchValues, ...newValue })}
          />
        </div>

        {/* Search btn */}
        <button
          className="flex justify-center items-center size-[75px] rounded-full bg-[#5FA777] shadow-xl hover:bg-[#5FA999]"
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  )
}
