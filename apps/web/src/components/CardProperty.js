import Image from "next/image"
import Link from "next/link"

export const CardProperty = ({ property }) => {
  const {
    title,
    description,
    price,
    photos,
    tags,
    createdAt,
    updatedAt,
    id,
  } = property

  //   {
  //     "title": "Hermosa casa de campo",
  //     "description": "Una encantadora casa de campo rodeada de naturaleza, ideal para escapadas familiares.",
  //     "price": 17666.45,
  //     "photos": [
  //         "url_de_foto_1.jpg",
  //         "url_de_foto_2.jpg",
  //         "url_de_foto_3.jpg"
  //     ],
  //     "tags": [],
  //     "createdAt": "2024-10-17T16:19:17.265Z",
  //     "updatedAt": "2024-10-17T16:19:17.265Z",
  //     "id": "671139059bc699366d668548"
  // },

  const photoUrl = photos.length > 0
    ? photos[0]
    : 'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg'

  return (
    <div className="border-2 border-[#5FA77780] rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer">
      <Link href={`property/detail/${property?.id}`}>
        <Image
          src={photoUrl}
          width={300}
          height={300}
          alt={`Photo of property`}
          className="object-cover w-full h-auto"
        />

        <div className='p-4'>
          <h3 className="font-roboto font-bold">{title}</h3>

          <div className='ml-1'>
            <p className="font-roboto text-sm font-bold text-slate-600">5 Huéspedes</p>
            <p className="font-roboto text-sm font-bold text-slate-600">4 Camas</p>

            <p className="font-roboto font-bold">
              <span className="text-[#5FA777]">${price}</span>
              <span className="text-black">/noche</span>
            </p>
          </div>
        </div>      
      </Link>
    </div>
  )
}
