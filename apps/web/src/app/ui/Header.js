import Image from 'next/image'

import userImage from '../public/Perfil.png'
import bannerImage from '../public/topbar.png'

export const Header = () => {
  return (
    <header className="relative w-full h-[110px] top-0 overflow-hidden bg-[#5FA777] px-8 shadow-2xl">
      <div className='flex h-full justify-between items-center'>
        <h1 className='text-5xl font-bold text-white'>Booked</h1>

        <Image src={userImage} alt="Perfil" width={70} height={70} />
      </div>
    </header>
  )
}
