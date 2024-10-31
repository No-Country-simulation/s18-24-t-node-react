"use client";
import { useState, useEffect, useCallback } from "react";
import { userRegister } from "@/app/api/callApi";
import { AlertPopup } from "@/components/Alert";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useBoundStore } from "@/store/bound.store";

const RegisterSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
  password: z.string({ required_error: 'Password is required' }).min(1, 'Password is required'),
  confirmPassword: z.string({ required_error: 'Confirm password is required' }).min(1, 'Password is required'),
  mobileNumber: z.string({ required_error: 'Mobile is required' }).min(1, 'Mobile is required'),
  birthDate: z.string({ required_error: 'BirthDate is required' }).min(1, 'BirthDate is required'),
  nationality: z.string({ required_error: 'Nationality is required' }).min(1, 'Nationality is required')
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const router = useRouter();

  const setUser = useBoundStore(state => state.setUser)

  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  function handleChangePass1(e) {
    e.preventDefault();
    setPass1(e.target.value);
  }

  const toggleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  function isOverAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fields = Object.fromEntries(new window.FormData(event.target));

    try {
      const data = RegisterSchema.parse(fields);

      const { confirmPassword, ...fieldData } = data

      const { token, user } = await userRegister(fieldData)

      if (!token) throw new Error('Missing token')

      window.localStorage.setItem('token', token)

      setUser(user)

      router.push('/')
    } catch (e) {
      let errors

      if (e instanceof z.ZodError) {
        errors = e.errors.map(({ message }) => message).join(' - ')

      } else {
        errors = e.message
      }

      setAlert({
        show: true,
        message: errors,
        type: "error",
      })

      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 4000);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">

      <div
        className="p-4 min-w-[500px] h-[80%] rounded-lg border-[#318F51] border-[.2px] shadow-md"
        id="formRegister"
      >
        {alert.show && <AlertPopup message={alert.message} type={alert.type} />}
        <h2 className="font-semibold text-4xl my-2 ml-2">Registrarme</h2>
        <p className="text-[#71717A] text-xl font-normal ml-2">
          Crear mi cuenta en Booked
        </p>

        <form
          className="px-8 mx-12 flex flex-col items-end"
          onSubmit={handleSubmit}
          id="register"
        >
          <label className="block py-1 w-[100%] font-medium">
            Nombre completo*
          </label>
          <input
            className="block p-1 w-[100%] rounded"
            name="name"
            type="text"
            placeholder="Nombre y apellido"
            required
          ></input>
          <label className="block py-1 w-[100%] font-medium">E-mail*</label>
          <input
            className="block p-1 w-[100%] rounded"
            name="email"
            type="email"
            placeholder="Escribe aqui tu email"
            title="solo se permite el siguiente formato '---@--mail.com'"
            required
          ></input>
          <label className="block py-1 w-[100%] font-medium">Contaseña*</label>
          <div className="block w-[100%] rounded">
            <input
              className="p-1 w-[80%] rounded"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Ingresa aqui tu contraseña"
              required
            ></input>
            <button className="p-1 rounded" onClick={toggleShowPassword}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <label className="block py-1 w-[100%] font-medium">
            Repetir Contraseña*
          </label>
          <div className="block w-[100%] rounded">
            <input
              className="w-[80%] p-1 rounded"
              type={showPassword ? "text" : "password"}
              placeholder="Reescribe tu contraseña"
              required
              name="confirmPassword"
            />
            <button className="p-1 rounded" onClick={toggleShowPassword}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <label className="block py-1 w-[100%] font-medium">
            Número de móvil*
          </label>
          <input
            className="block p-1 w-[100%] rounded"
            name="mobileNumber"
            type="tel"
            pattern="^\+?[0-9]+$"
            minLength={12}
            maxLength={14}
            placeholder="Ej: +549 111 1111111"
            title="Solo se permiten números del 0 al 9 y el signo +"
            required
          ></input>
          <label className="block py-1 w-[100%] font-medium">
            Fecha de Nacimiento*
          </label>
          <input
            className="block p-1 w-[100%] rounded"
            name="birthDate"
            type="date"
            placeholder="Elije una fecha"
            required
          ></input>
          <label className="block py-1 w-[100%] font-medium">Nacionalidad*</label>
          <input
            className="block p-1 w-[100%] rounded"
            name="nationality"
            type="text"
            placeholder="Ingrese su nacionalidad"
            required
          ></input>
          <label className="font-normal">
            <input className="mx-1" type="checkbox" required /> He leido y acepto
            los
            <a className="text-[#318F51]" href="#">
              {" "}
              Términos y condiciones{" "}
            </a>{" "}
            de Booked
          </label>
          <button
            className=" block bg-[#318F51] text-white rounded w-[124px] h-[40px] my-2 "
            type="submit"
          >
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}