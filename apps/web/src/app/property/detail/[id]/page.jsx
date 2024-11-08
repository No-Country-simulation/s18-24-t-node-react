"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useProperties } from "../../../../hooks/useProperties";
import { InputSearch } from "../../../../ui/InputSearch";
import { Spinner } from "../../../../ui/Spinner";
import { paymentStripe } from "@/app/api/callApi";

import userImage from "../../../public/Perfil.png";
import { useInputSearch } from "../../../../hooks/useInputSearch";
import Map from "@/components/ui/Map";

const PropertyDetail = () => {
  const params = useParams();
  const router = useRouter();

  const [currentProperty, setCurrentProperty] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [privateFilters, setPrivateFilters] = useState({});
  const [selectedPeopleQuantity, setSelectedPeopleQuantity] = useState(1);

  const [totalPrice, setTotalPrice] = useState(0);

  const { searchValues } = useInputSearch();
  const { getPropertyById } = useProperties();

  const handleClickReserve = async () => {
    const payment = {
      name: currentProperty.title,
      description: currentProperty.description,
      currency: "USD",
      unit_amount: totalPrice * 100,
      quantity: 1,
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    }

    const responseUrl = await paymentStripe(payment);

    if (responseUrl) {
      window.location.href = responseUrl;
    } else {
      setAlert({
        show: true,
        message: "Error al registrar el pago",
        type: "error",
      });
    }
    setTimeout(
      () =>
        setAlert({
          show: false,
          message: "",
          type: "",
        }),
      10000
    );
  }

  function countDaysBetweenDates(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceInMiliseconds = end - start;

    const days = Math.ceil(differenceInMiliseconds / (1000 * 60 * 60 * 24));

    return days;
  }

  useEffect(() => {
    setIsLoading(true);

    getPropertyById(params?.id)
      .then((data) => setCurrentProperty(data))
      .catch((error) => router.push("/"))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const totalDays = countDaysBetweenDates(
      privateFilters.startDate,
      privateFilters.endDate
    );
    const total = (currentProperty?.price * totalDays).toFixed(0);

    setTotalPrice(total);
  }, [currentProperty, privateFilters]);

  useEffect(() => {
    if (Object.keys(searchValues).length > 0)
      setPrivateFilters({
        startDate: searchValues.startDate,
        endDate: searchValues.endDate,
      });
  }, [searchValues]);

  return (
    <section className="p-8 space-y-8">
      <div className="flex justify-center items-center">
        <InputSearch />
      </div>

      {/* {currentProperty && !isLoading && <CardProperty property={currentProperty} />} */}
      {isLoading && <Spinner />}

      {!isLoading && Object.keys(currentProperty).length > 1 && (
        <div className="flex gap-20">
          <div className="space-y-4 h-fit w-80 bg-slate-50 rounded p-6 border border-slate-200 shadow-md sticky top-4">
            <header className="space-y-2">
              <h2 className="font-semibold">{currentProperty?.title}</h2>
              <p className="font-medium">
                <span className="text-green-600">
                  ${currentProperty?.price}
                </span>
                /la noche
              </p>
            </header>

            <div>
              <label>Desde - Hasta</label>
              <Datepicker
                value={{
                  startDate: privateFilters.startDate,
                  endDate: privateFilters.endDate,
                }}
                toggleClassName={"hidden"}
                readOnly
                inputClassName={
                  "w-20 hover:cursor-pointer w-full bg-transparent"
                }
                placeholder="Dates"
                onChange={(data) => setPrivateFilters(data)}
              />
            </div>

            <div>
              <label htmlFor="">Huespedes: {selectedPeopleQuantity}</label>
              <input
                type="range"
                name="peopleQuantity"
                min={1}
                max={20}
                className="w-full accent-[#318F51]"
                onChange={(data) =>
                  setSelectedPeopleQuantity(data.target.value)
                }
                value={selectedPeopleQuantity}
              />
            </div>

            <button
              onClick={handleClickReserve}
              className="bg-[#318F51] py-1 rounded-lg w-full px-8 font-semibold text-slate-100 shadow-sm border border-slate-200 hover:cursor-pointer hover:bg-[#5FA77C82]/70 m-auto"
            >
              Reservar
            </button>
            <strong>Total: ${totalPrice}</strong>
          </div>


          <div className="space-y-8 size-[1200px] h-full">
            {/* Photos */}
            <div className="p-8 grid grid-cols-8 gap-2 bg-[#5FA77738] rounded-xl">
              <img
                className="col-span-4 row-span-2 w-full h-full object-cover"
                src="https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg"
              />

              <img
                className="col-start-5 col-span-4 w-full"
                src="https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg"
              />

              <img
                className="col-start-5 col-span-2"
                src="https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg"
              />

              <img
                className="col-start-7 col-span-2"
                src="https://agentrealestateschools.com/wp-content/uploads/2021/11/real-estate-property.jpg"
              />

              <p className="col-start-1 col-end-8 font-bold text-slate-700 text-xl pt-2">
                {currentProperty.title}
              </p>
              <p className="col-start-1 col-end-8 text-slate-500 font-bold">
                {currentProperty?.tags?.join(" - ")}
              </p>
            </div>

            <hr className="h-[1px] bg-slate-400 mx-10" />

            <div className="flex font-bold text-xl px-10 gap-20">
              <h3 className="text-slate-700">
                Mejor valorado por los huéspedes
              </h3>

              <div className="flex gap-4">
                <small>4.9 ⭐</small>
                <p>10</p>
              </div>
            </div>

            <hr className="h-[1px] bg-slate-400 mx-10" />

            {/* Mapa */}
            <div className="space-y-20">
              <h3 className="font-bold text-xl px-10 text-slate-700">
                Aca es donde vas a estar
              </h3>
              <Map latitude={-34.5451275} longitude={-58.4508504} />
            </div>

            <h3 className="font-bold text-xl px-10 text-slate-700 py-10">
              Conoce a tu anfitrion
            </h3>

            {/* User */}
            <div className="flex justify-center items-center gap-10 text-slate-700">
              <div className="flex flex-col justify-center items-center p-4 w-[500px]">
                <Image src={userImage} alt="Perfil" width={100} height={100} />
                <strong>Marcelo</strong>
                <span className="py-2">Información confirmada</span>
                <ul>
                  <li>✔ Identidad</li>
                  <li>✔ Correo electronico</li>
                  <li>✔ Numero de telefono</li>
                </ul>
              </div>

              <div>
                <div className="flex divide-x">
                  <div className="flex flex-col justify-center items-center pr-4 font-bold">
                    <h4>Calificacion</h4>
                    4.8 ⭐
                  </div>

                  <div className="flex flex-col justify-center items-center px-4">
                    <strong>1</strong>
                    <small>Año de experiencia como anfitrion</small>
                  </div>

                  <div className="flex flex-col justify-center items-center pl-4 font-bold">
                    <h4>Evaluaciones</h4>
                    <small>8</small>
                  </div>
                </div>

                <hr className="bg-slate-400 my-4" />

                <div className="mx-2 space-y-4">
                  <p>
                    Hola, soy Marcelo, mi viaje ha sido moldeado por el deseo de
                    crear momentos únicos para nuestros huéspedes. Con una
                    pasión por la bienvenida y la atención al detalle,
                    transformamos nuestro Sitio en un refugio donde el confort y
                    la naturaleza se unen en armonía. Si tienes cualquier
                    pregunta, ponte en contacto conmigo.
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="text-amber-500 font-semibold">
                      Enviale un mensaje a tu anfitrion
                    </p>
                    <button className="bg-[#318F51] py-1 px-2 rounded text-slate-50 font-semibold">
                      Toca aca para chatear
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PropertyDetail;
