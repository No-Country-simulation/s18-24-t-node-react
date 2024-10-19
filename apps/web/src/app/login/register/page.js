"use client";
import { useState, useEffect } from "react";
import { userRegister } from "@/app/api/callApi";

export default function RegisterForm(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobileNumber: "",
        birthDate:"",
        nationality:""
    })
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [passMatch, setPassMatch] = useState(true);
    const [birthDate, setBirthDate] = useState(Date());

    useEffect(() => {
        verifyPassword();
    }, [pass1, pass2]);

    function handleChangePass1(e){
        e.preventDefault()
        setPass1(e.target.value)
    }
    function handleChangePass2(e){
        e.preventDefault()
        setPass2(e.target.value)
    }
    function verifyPassword(){
        (pass1 === pass2) 
        ? setPassMatch(true) 
        : setPassMatch(false);
    }

    function handleChangeDate(e){
        e.preventDefault()
        setBirthDate(e.target.valueAsDate)
    }

    function isOverAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age >= 18;
    }

    async function onSubmit(event) {
        event.preventDefault()
        if (passMatch=== true && isOverAge(birthDate)){
        const data = new FormData(event.target)

        for (const [key, value] of data){
            setFormData(prevFormData => ({
                ...prevFormData,
                [key]: value,}))          
        };
        
        const response = await userRegister(formData)
        console.log(response)
        }
        else{alert("intente nuevamente")}
    }

    return(
        <div className="w-1/3 min-w-[500px] h-[80%] rounded-lg border-[#318F51] border-[.2px] my-4 shadow-md" id="formRegister">
            <h2 className="font-bold text-4xl my-2 ml-2">Registrarme</h2>
            <p className="text-[#71717A] text-xl ml-2">Crear mi cuenta en Booked</p>
            <form className="px-8 mx-12 flex flex-col items-end" onSubmit={onSubmit} id="register">
                <label className="block py-1 w-[100%] font-bold">Nombre completo*</label>
                <input className="block py-1 w-[100%] rounded" name="name" type="text" placeholder="Nombre y apellido" required></input>
                <label className="block py-1 w-[100%] font-bold">E-mail*</label>
                <input className="block py-1 w-[100%] rounded" name="email" type="email" placeholder="Escribe aqui tu email" required></input>
                <label className="block py-1 w-[100%] font-bold">Contaseña*</label>
                <input className="block py-1 w-[100%] rounded" onChange={handleChangePass1} name="password" type="password" placeholder="Ingresa aqui tu contraseña" required></input>
                <label className="block py-1 w-[100%] font-bold">Repetir Contraseña*</label>
                <input className="block py-1 w-[100%] rounded" onChange={handleChangePass2} type="password" placeholder="Reescribe tu contraseña" required></input>
                <span className="text-yellow-500 text-xs text-center" hidden={passMatch} >las contraseñas no coinciden</span>
                <label className="block py-1 w-[100%] font-bold">Número de móvil*</label>
                <input className="block py-1 w-[100%] rounded" name="mobileNumber" type="tel" pattern="[0-9]{10}" minLength={10} placeholder="Ej: 111 1111111" required></input>
                <label className="block py-1 w-[100%] font-bold">Fecha de Nacimiento*</label>
                <input className="block py-1 w-[100%] rounded" onChange={handleChangeDate} name="birthDate" type="date" placeholder="Elije una fecha" required></input>
                <label className="block py-1 w-[100%] font-bold">Nacionalidad*</label>
                <input className="block py-1 w-[100%] rounded" name="nationality" type="text" placeholder="Ingrese su nacionalidad" required></input> 
                <label><input className="mx-1" type="checkbox" required/> He leido y acepto los<a className="text-[#318F51]" href="#"> Términos y condiciones </a> de Booked</label>
            <button className=" block bg-[#318F51] text-white rounded w-[124px] h-[40px] my-2 " type="submit">Crear cuenta</button>
            </form>
        </div>
    )
}