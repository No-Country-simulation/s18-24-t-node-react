import React from "react";
import Sidebar from "../components/sidebar";

const messages = () => {
  return (
    <div className=" bg-white h-screen flex">
      <Sidebar />
      <div className="flex-1 bg-white p-4">
        <div>
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
              <input type="checkbox" />
              <label className="text-black">Seleccionar todo</label>
              <div className="border border-b-2 border-black w-44"></div>
            </div>

            <div>
              <button>Eliminar</button>
            </div>
          </div>
        </div>
        <div>
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <input type="checkbox" />
              <label className="text-black text-sm">Seleccionar todo</label>
              <label className="text-black text-sm">Hola</label>
            </div>
            <div className="flex">
              <button className="text-black">...</button>
            </div>
          </div>
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <input type="checkbox" />
              <label className="text-black text-sm">Seleccionar todo</label>
              <label className="text-black text-sm">Hola</label>
            </div>
            <div className="flex">
              <button className="text-black">...</button>
            </div>
          </div>
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <input type="checkbox" />
              <label className="text-black text-sm">Seleccionar todo</label>
              <label className="text-black text-sm">Hola</label>
            </div>
            <div className="flex">
              <button className="text-black">...</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default messages;
