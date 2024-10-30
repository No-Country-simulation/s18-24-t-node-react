"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InputSearch } from "../../ui/InputSearch";

const PropertyDetail = () => {
  useEffect(() => {}, []);

  const router = useRouter();
  const searchParams = new URLSearchParams(window?.location?.search);

  const [filters, setFilters] = useState({
    guests: 1,
    checkIn: "",
    checkOut: "",
  });

  const handleClickReserve = async () => {
    let params = {};

    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (typeof filters[key] === "string" && filters[key].trim() === "") {
          searchParams.delete(key);
          return;
        }

        if (filters[key] !== null) params[key] = filters[key];
      });
    }

    if (params) addQueryAndReload(params);
  };

  const addQueryAndReload = (queryParams) => {
    for (const param in queryParams) {
      searchParams.set(param, queryParams[param]);
    }

    router.push(`?${searchParams.toString()}`);
  };

  const { guests, checkIn, checkOut } = filters;

  return (
    <section className="flex gap-20 p-8">
      <div className="flex flex-col gap-4 bg-white px-6 py-8 rounded-2xl h-fit border border-gray-300">
        <h2 className="text-xl font-semibold text-slate-950">
          Noche de la cabaña
          <p>25/la noche</p>
        </h2>
        <div className="space-y-2">
          <div className="space-x-4">
            <label htmlFor="guests">Cantidad de huéspedes</label>
            <span className="text-slate-950 font-semibold">{guests}</span>
          </div>

          <input
            type="number"
            name="guests"
            min={1}
            max={20}
            value={guests ?? 0}
            onChange={(data) =>
              setFilters((prev) => ({
                ...prev,
                guests: data?.target?.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="checkIn">Check-In</label>
          <input
            className="rounded-md outline-none px-2 shadow-sm border border-slate-200"
            type="date"
            name="checkIn"
            value={checkIn}
            onChange={(data) =>
              setFilters((prev) => ({ ...prev, checkIn: data?.target?.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="checkOut">Check-Out</label>
          <input
            className="rounded-md outline-none px-2 shadow-sm border border-slate-200"
            type="date"
            name="checkOut"
            value={checkOut}
            onChange={(data) =>
              setFilters((prev) => ({ ...prev, checkOut: data?.target?.value }))
            }
          />
        </div>

        {/* Reserve button */}
        <button
          onClick={handleClickReserve}
          className="bg-[#5FA77C82] py-1 rounded-2xl w-fit px-8 font-semibold text-slate-100 shadow-sm border border-slate-200 hover:cursor-pointer hover:bg-[#5FA77C82]/70 m-auto"
        >
          Reservar
        </button>
      </div>
      <div className="flex flex-col gap-10 justify-center items-center w-full h-full">
        <InputSearch />
      </div>
    </section>
  );
};

export default PropertyDetail;
