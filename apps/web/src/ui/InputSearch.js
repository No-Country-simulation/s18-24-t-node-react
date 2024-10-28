import Datepicker from 'react-tailwindcss-datepicker'
import { Dropdown } from '../components/Dropdown'
import { SearchIcon} from './icons/SearchIcon'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const InputSearch = () => {
  const [searchValues, setSearchValues] = useState({})
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false)
  
  const router = useRouter()

  const handleClickSetDestination = (destination) => {
    setSearchValues({ ...searchValues, destination })
    setIsDestinationsOpen(false)
  }

  const closeDatePicker = () => {
    const input = document.getElementById('datepicker');
    if (input) {
      input.focus()
    }
  }

  const redirectToPage = () => {
    const startDate = new Date(searchValues?.startDate)

    console.log(startDate)
    
    const endDate = Date(searchValues?.endDate)

    // const queryParams = {
    //   destination: searchValues?.destination,
    //   startDate,
    //   endDate,
    // }

    // const queryString = new URLSearchParams(queryParams).toString()
    // router.push(`/new-url?${queryString}`);
  };

  // http://localhost:3000/property?origin=''&startDate=''&endDate=''&


  return (
    <div className="flex justify-between items-center gap-2 bg-slate-50 w-[600px] h-[90px] rounded-full px-8 shadow-2xl border border-slate-900 text-center">

      {/* Dropdown */}
      <Dropdown
        setDestination={handleClickSetDestination}
        toggleIsOpen={() => setIsDestinationsOpen(!isDestinationsOpen)}
        destination={searchValues?.destination}
        isOpen={isDestinationsOpen}
      />

      {/* Datepicker */}
      <div
        onClick={closeDatePicker}
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
        onClick={redirectToPage}
        className="flex justify-center items-center size-[75px] rounded-full bg-[#5FA777] shadow-md hover:bg-cyan-900/80 border border-slate-200"
      >
        <SearchIcon />
      </button>
    </div>
  )
}
