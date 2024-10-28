'use client'

import { useState } from "react"

export const useProperties = () => {
  const [properties, setProperties] = useState([])
  const [isLoading, setIsLoading,] = useState(true)


  const getProperties = async (inputQueryParams) => {


    // title: string;
    // minPrice
    // maxPrice
    // tags: string[];

    // @IsIn(['ASC', 'DES'])
    // orderBy: Orders;

    const params = {}

    setIsLoading(true)

    if (inputQueryParams) {
      Object.keys(inputQueryParams).forEach(key => {
        if (inputQueryParams[key] !== undefined) {
          params[key] = inputQueryParams[key].toString()
        }
      });
    }

    const queryParams = new URLSearchParams(params);

    try {
      const response = await fetch(`https://booked-nu.vercel.app/property?${queryParams}`)

      if (!response.ok || response.status !== 200) throw new Error(`Error ${response.status}: ${response.statusText}`)

      const propertiesData = await response.json()

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