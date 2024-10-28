import Image from 'next/image'

import userImage from '../app/public/Perfil.png'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="relative w-full h-[110px] top-0 overflow-hidden bg-[#5FA777] px-8 shadow-2xl">
        <div className='flex h-full justify-between items-center'>
          <Link href={'/'} className='text-5xl font-bold text-white hover:text-opacity-70'>Booked</Link>

          <Image src={userImage} alt="Perfil" width={70} height={70} />
        </div>
    </header>
  )
}
