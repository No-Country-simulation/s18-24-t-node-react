"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // Obtiene la ruta actual

  // Función para verificar si el link es el actual
  const isActive = (path) => pathname === path;
  return (
    <div className="w-64 h-screen bg-white text-black ">
      {/* <div className="p-4 text-xl font-semibold">My Sidebar</div> */}
      <nav className="pt-10">
        <ul className="space-y-4 pl-10">
          <li>
            <Link
              href="/"
              className={`block p-2 rounded ${
                isActive("/") ?  "bg-blue-200 font-bold" : "hover:bg-blue-200"
              }`}
            >
              Mi perfil
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`block p-2 rounded ${
                isActive("/") ? "bg-blue-200 font-bold" : "hover:bg-blue-200"
              }`}
            >
              Mis reservas
            </Link>
          </li>
          <li>
            <Link
              href="/messages"
              className={`block p-2 rounded ${
                isActive("/messages") ? "bg-blue-200 font-bold" : "hover:bg-blue-200"
              }`}
            >
              Mensajes
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className={`block p-2 rounded ${
                isActive("/") ?  "bg-blue-200 font-bold" : "hover:bg-blue-200"
              }`}
            >
              Guardados
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`block p-2 rounded ${
                isActive("/") ?  "bg-blue-200 font-bold" : "hover:bg-blue-200"
              }`}
            >
              Mis propiedades
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`block p-2 rounded ${
                isActive("/") ?  "bg-blue-200 font-bold" : "hover:bg-blue-200"
              }`}
            >
              Configuracion
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
