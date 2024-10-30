'use client'

import Image from "next/image"
import BannerImage from '../app/public/fondohome.png'
import { InputSearch } from './InputSearch'

export const Banner = () => {
  return (
    <div className="relative w-full flex flex-col items-center">
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
      <div className="absolute top-32">
        <InputSearch/>
      </div>
    </div>
  )
}
