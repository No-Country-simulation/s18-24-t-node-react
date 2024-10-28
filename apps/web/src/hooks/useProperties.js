'use client'

import { useState } from "react"

export const useProperties = () => {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading,] = useState(true)


  const getProperties = async () => {
    setIsLoading(true)

    try {
      const data = await fetch('https://booked-nu.vercel.app/property')
      if (!data.ok) throw new Error('Error')

      const propertiesData = await data.json()

      setProperties(propertiesData)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    getProperties,
    properties,
    isLoading
  }
}
