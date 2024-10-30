"use client";
import { useState, useEffect, useCallback } from "react";
import { userRegister } from "@/app/api/callApi";
import { AlertPopup } from "@/components/Alert";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [passMatch, setPassMatch] = useState(true);
  const [birthDate, setBirthDate] = useState(Date());
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  function handleChangePass1(e) {
    e.preventDefault();
    setPass1(e.target.value);
  }
  function handleChangePass2(e) {
    e.preventDefault();
    setPass2(e.target.value);
  }
  const verifyPassword = useCallback(() => {
    pass1 === pass2 ? setPassMatch(true) : setPassMatch(false);
  }, [pass1, pass2]);

  useEffect(() => {
    verifyPassword();
  }, [verifyPassword]);

  function handleChangeDate(e) {
    e.preventDefault();
    setBirthDate(e.target.valueAsDate);
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
    if (passMatch === true && isOverAge(birthDate)) {
      let data = new FormData(event.target);
      //recorro los datos del formulario y los seteo en newoFormData
      let newFormData = {
        name: "",
        email: "",
        password: "",
        mobileNumber: "",
        birthDate: "",
        nationality: "",
      };
      for (const [key, value] of data.entries()) {
        newFormData[key] = value;
      }
      //paso a mi api los datos
      const response = userRegister(newFormData);
      response.then(result => {
        //console.log('Resultado:', result);
        if(result.message === "Registro exitoso"){
          setAlert(result);
          setTimeout(() => router.push("/auth/login"), 10000);
        }
        setAlert(result)
      })
      .catch(error => {
        //console.error('Error:', error);
        setAlert(error)
      });
      
    } else {
      isOverAge(birthDate)
        ? setAlert({
            show: true,
            message: "Error en el registro contraseñas incorrectas",
            type: "error",
          })
        : setAlert({
            show: true,
            message:
              "Error en el registro tiene que ser mayor de 18 años para registrarse",
            type: "error",
          });
    }
    //aqui seteo mi alerta para que desaparezca
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 10000);
  }

  return (
    <div className="flex items-center justify-center">
    <div
      className="w-1/3 min-w-[500px] h-[80%] rounded-lg border-[#318F51] border-[.2px] my-4 shadow-md"
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
            onChange={handleChangePass1}
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
            onChange={handleChangePass2}
            type={showPassword ? "text" : "password"}
            placeholder="Reescribe tu contraseña"
            required
          />
          <button className="p-1 rounded" onClick={toggleShowPassword}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
        <span
          className="text-yellow-500 text-xs text-center"
          hidden={passMatch}
        >
          las contraseñas no coinciden
        </span>
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
          onChange={handleChangeDate}
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
