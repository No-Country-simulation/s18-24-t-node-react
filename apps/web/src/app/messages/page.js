"use client";
import Sidebar from "../components/Sidebar";
import React, { useState } from "react";
const Messages = () => {
  const [checkboxes, setCheckboxes] = useState({
    selectAll: false,
    option1: false,
    option2: false,
    option3: false,
  });

  // Manejador de cambio para los checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes((prev) => ({ ...prev, [name]: checked }));

    // Si se selecciona "Seleccionar todo", actualiza todos
    if (name === "selectAll") {
      setCheckboxes({
        option1: checked,
        option2: checked,
        option3: checked,
      });
    }
  };
  const selectedCount = Object.values(checkboxes).filter(Boolean).length;
  return (
    <div className=" bg-white h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-white p-4">
        <section>
          <h1 className="text-black flex justify-start font-bold text-4xl">
            Mensajes
          </h1>
          <div>
            <p className="text-gray-400">
              Puedes ver, responder o eliminar mensajes desde este menú.
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <input
                type="checkbox"
                name="selectAll"
                checked={checkboxes.selectAll}
                onChange={handleCheckboxChange}
              />
              <label className="text-black">Seleccionar todo</label>
              <div className="border border-b-2 border-black w-44"></div>
            </div>

            <div>
              <button>Eliminar</button>
            </div>
          </div>
        </section>
        <section>
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="option1"
                checked={checkboxes.option1}
                onChange={handleCheckboxChange}
              />
              <label className="text-black text-sm">Seleccionar todo</label>
              <label className="text-black text-sm">Hola</label>
            </div>
            <div className="flex">
              <button className="text-black">...</button>
            </div>
          </div>
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="option2"
                checked={checkboxes.option2}
                onChange={handleCheckboxChange}
              />
              <label className="text-black text-sm">Seleccionar todo</label>
              <label className="text-black text-sm">Hola</label>
            </div>
            <div className="flex">
              <button className="text-black">...</button>
            </div>
          </div>
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                name="option3"
                checked={checkboxes.option3}
                onChange={handleCheckboxChange}
              />
              <label className="text-black text-sm">Seleccionar todo</label>
              <label className="text-black text-sm">Hola</label>
            </div>
            <div className="flex">
              <button className="text-black">...</button>
            </div>
          </div>
        </section>
        <div className="pt-14 flex justify-between ">
          <div>
            <span className="text-gray-400 text-sm">
              {selectedCount} de 3 mensajes seleccionados
            </span>
          </div>
          <div>
            <span className="text-black text-sm">
              Mensajes por pagina:
              <input
                type="number"
                value="10"
                class="w-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </span>
          </div>
          <div>
            <span className="text-black text-sm">
              Pagina 1 de 1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
