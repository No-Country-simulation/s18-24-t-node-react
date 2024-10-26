import { Banner } from './ui/Banner'
import { CardProperty } from './components/CardProperty'
import Image from 'next/image'

const Page = () => {
  return (
    <section>
      <Banner />

      <section className='px-8 max-w-[1400px] m-auto'>
        <h2 className="font-roboto text-3xl text-slate-700 font-bold py-14">Destinos populares</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="border-2 border-[#5FA77780] rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:cursor-pointer">

              <Image
                src={'https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg'}
                width={300}
                height={300}
                alt={`Destino ${index + 1}`}
                className="object-cover w-full h-auto"
              />

              <div className='p-4'>
                <h3 className="font-roboto font-bold">San Carlos de Bariloche</h3>

                <div className='ml-1'>
                  <p className="font-roboto text-sm font-bold text-slate-600">5 Huéspedes</p>
                  <p className="font-roboto text-sm font-bold text-slate-600">4 Camas</p>

                  <p className="font-roboto font-bold">
                    <span className="text-[#5FA777]">$25</span>
                    <span className="text-black">/noche</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/*

        <div className="relative z-10 text-center">

          <div className="flex space-x-6 mt-20">
          <button
            onClick={() => setDestinosVisible(!destinosVisible)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {destinoSeleccionado}
            </button>
            {destinosVisible && (
              <div className="absolute bg-white shadow-lg rounded mt-2">
                {destinos.map((destino, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setDestinoSeleccionado(destino);
                      setDestinosVisible(false);
                    }}
                  >
                    {destino}
                  </div>
                ))}
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setShowDatepickerIda(!showDatepickerIda)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                IDA
              </button>
              {showDatepickerIda && (
                <Datepicker
                  value={dateIda}
                  onChange={setDateIda}
                  primaryColor={"blue"}
                  displayFormat={"DD/MM/YYYY"}
                  containerClassName="absolute z-50 mt-2 bg-white shadow-lg rounded-lg p-4"
                  inputClassName="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  showShortcuts={true}
                />
              )}
              <span>{dateIda.startDate ? dateIda.startDate : ''}</span>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowDatepickerVuelta(!showDatepickerVuelta)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                VUELTA
              </button>
              {showDatepickerVuelta && (
                <Datepicker
                  value={dateVuelta}
                  onChange={setDateVuelta}
                  primaryColor={"blue"}
                  displayFormat={"DD/MM/YYYY"}
                  containerClassName="absolute z-50 mt-2 bg-white shadow-lg rounded-lg p-4"
                  inputClassName="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-500"
                  showShortcuts={true}
                />
              )}

            <span>{dateVuelta.startDate ? dateVuelta.startDate : ''}</span>

            <button
              onClick={() => setMostrarPasajeros(!mostrarPasajeros)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Pasajeros: {pasajeros}
            </button>
            {mostrarPasajeros && (
              <div className="absolute bg-white shadow-lg rounded mt-2 p-4">
                <h3>Selecciona la cantidad de huéspedes (1 - 10):</h3>
                {[...Array(10)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setPasajeros(index + 1);
                      setMostrarPasajeros(false);
                    }}
                    className={`block w-full text-left p-2 ${pasajeros === index + 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Buscar</button>
          </div>
        </div>
      </div> */}
    </section >
  )
}

export default Page