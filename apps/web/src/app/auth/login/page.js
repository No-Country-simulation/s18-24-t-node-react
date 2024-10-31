"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveToken, getToken } from "@/app/api/token";
import { AlertPopup } from "@/components/Alert";

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


      if (!response.ok) {
        const errorMessages = await response.json()

        if (Array.isArray(errorMessages.messages)) {
          throw new Error(errorMessages.message?.map(msg => msg).join(','))
        }

        throw new Error(errorMessages.message)
      }

        const data = await response.json();

        saveToken(data.token);
        setAlert({ show: true, message: "Login successful", type: "success" });
      setTimeout(() => router.push("/"), 11000);
    } catch (error) {
      setAlert({ show: true, message: error.message, type: "error" });
    }
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 10000);
  };
  return (
    <>
      <div className="min-h-screen flex justify-center mt-52">
        {alert.show && <AlertPopup message={alert.message} type={alert.type} />}
        <form
          className="bg-white bg-opacity-65 p-8 rounded-3xl shadow-md w-full max-w-md h-fit"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-bold mb-1 text-left text-black">
            Ingresar nuevamente
          </h2>
          <h4 className="text-xl text-left text-gray-500">
            Entrar a mi cuenta
          </h4>
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

            <div className="flex justify-between w-80">
              <Link href={"/auth/register"}>
                <u>Registrarme</u>
              </Link>
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
