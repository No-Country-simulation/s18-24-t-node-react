"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken, getToken } from "@/app/api/token";
import { AlertPopup } from "@/app/components/Alert";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      console.log(response);

      if (response.ok) {
        const data = await response.json();
        saveToken(data.token);
        setAlert({ show: true, message: "Login successful", type: "success" });
        setTimeout(() => router.push("/"), 11000);
        //router.push("/");
      } else {
        const errorDetails = await response.json(); // Captura más detalles del error
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${errorDetails.message}`
        );
      }
    } catch (error) {
      setAlert({ show: true, message: error.message, type: "error" });
      console.error(error);
    }
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 10000);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center mt-7">
        {alert.show && <AlertPopup message={alert.message} type={alert.type} />}
        <form
          className="bg-white bg-opacity-65 p-8 rounded-3xl shadow-md w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-1 text-left text-black">
            Ingresar nuevamente
          </h2>
          <h4 className="text-xl text-left text-gray-500">
            Entrar a mi cuenta
          </h4>
          <Link href={"/auth/register"}>
            <u>Registrarme</u>
          </Link>
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 w-80 ">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Usuario*
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email registrado"
              />
            </div>
            <div className="mb-6 w-80">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border text-sm rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Escribe tu contraseña"
              />
            </div>
            <div className="flex justify-end w-80">
              <button
                type="submit"
                className="w-28 text-sm bg-color_form_button rounded-md text-white py-2 px-4 focus:outline-none focus:shadow-outline hover:bg-blue-700"
              >
                Continuar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
