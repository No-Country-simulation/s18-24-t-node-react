import Image from "next/image"

export const CardProperty = ({ id }) => {
  return (
    <div key={id} className="border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 group relative hover:cursor-pointer">
      <div className="overflow-hidden">
        <Image
          src={id}
          alt={`Alojamiento ${id}`}
          className="object-cover w-full h-[600px] transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Texto en la parte inferior izquierda */}
      {/* <div className="absolute bottom-4 left-4 text-white">
        {index === 0 && (
          <>
            <h3 className="text-[36px] font-bold">Buenos Aires</h3>
            <p>28 alojamientos</p>
          </>
        )}
        {index === 1 && (
          <>
            <h3 className="text-[36px] font-bold">Mar del Plata</h3>
            <p>15 alojamientos</p>
          </>
        )}
        {index === 2 && (
          <>
            <h3 className="text-[36px] font-bold">Mendoza</h3>
            <p>10 alojamientos</p>
          </>
        )}
        {index === 3 && (
          <>
            <h3 className="text-[36px] font-bold">Salta</h3>
            <p>12 alojamientos</p>
          </>
        )}
        {index === 4 && (
          <>
            <h3 className="text-[36px] font-bold">Buenos Aires</h3>
            <p>20 alojamientos</p>
          </>
        )}
        {index === 5 && (
          <>
            <h3 className="text-[36px] font-bold">Mar del Plata</h3>
            <p>18 alojamientos</p>
          </>
        )}
      </div> */}
    </div>
  )
}
