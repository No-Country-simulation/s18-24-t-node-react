'use client'

import { useState } from "react"
import { getFormatedDate } from '../utils/getFormatedDate'
import { useRouter } from "next/navigation"

export const useInputSearch = () => {

  const [searchValues, setSearchValues] = useState({})
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false)

  const router = useRouter()

  const handleClickSetDestination = (destination) => {

    const startDate = new Date(destination.startDate)
    const endDate = new Date(destination.endDate)

    if (!startDate || !endDate) return

    setSearchValues({ ...searchValues, destination })
    setIsDestinationsOpen(false)
  }

  const handleClickSetDate = (dates) => {
    setSearchValues({ ...searchValues, ...dates })
  }


  const redirectToPage = () => {

    const startDate = getFormatedDate(searchValues?.startDate)
    const endDate = getFormatedDate(searchValues?.endDate)

    if (!startDate || !endDate) return

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) return

    const queryParams = {
      destination: searchValues?.destination,
      startDate,
      endDate,
    }

    const queryString = new URLSearchParams(queryParams).toString()
    router.push(`/property?${queryString}`);
  };

  return {
    redirectToPage,
    handleClickSetDate,
    handleClickSetDestination,
    searchValues,
    isDestinationsOpen,
    setIsDestinationsOpen
  }
}
