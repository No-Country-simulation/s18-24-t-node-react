"use client";
import { useState, useEffect } from "react";
import { paymentStripe } from "@/app/api/callApi";
import { AlertPopup } from "@/app/components/Alert";
import { HeaderBooked } from "@/app/components/headerBooked";

export default function PaymentForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("");
  const [unit_Amount, setUnitAmount] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {}, []);

  function handleChangeName(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    e.preventDefault();
    setDescription(e.target.value);
  }
  function handleChangeCurrency(e) {
    e.preventDefault();
    setCurrency(e.target.value);
  }
  function handleChangeUnitAmount(e) {
    e.preventDefault();
    setUnitAmount(e.target.value);
  }
  function handleChangeQuantity(e) {
    e.preventDefault();
    setQuantity(e.target.value);
  }

  function sanitizePaymentData(newPayment) {
    return {
      name: newPayment.name.trim(),
      description: newPayment.description.trim(),
      currency: newPayment.currency.toUpperCase(),
      unit_amount: Number(newPayment.unitAmount),
      quantity: Number(newPayment.quantity),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    };
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let newPayment = {};
    formData.forEach((value, key) => {
      newPayment[key] = value;
    });

    const sanitizedPayment = sanitizePaymentData(newPayment);
    console.log(sanitizedPayment);
    if (
      isNaN(sanitizedPayment.unit_amount) ||
      isNaN(sanitizedPayment.quantity)
    ) {
      setAlert({
        show: true,
        message: "Los campos UnitAmount y Quantity deben ser números",
        type: "error",
      });
      return;
    }

    const responseUrl = await paymentStripe(sanitizedPayment);

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
  return (
    <div className="flex flex-col items-center bg-white min-h-screen text-black">
      <HeaderBooked />
      <div className="justify-start	justify-content: flex-start">
        <h2 className="font-semibold text-4xl my-2 ml-2">Registrar mi pago</h2>
        <p>
          {" "}
          Ingresa tus datos para hacer efectiva tu reserva y pagarla de forma
          rapida y segura
        </p>
        <img src="/images/payment.png" alt="payment" className="w-1/3" />
      </div>
      <div
        className="w-1/3 min-w-[900px] h-[500px] rounded-lg border-[#318F51] my-4 shadow-md bg-[#5FA77738]"
        id="formPayment"
      >
        {alert.show && <AlertPopup message={alert.message} type={alert.type} />}

        <form
          className="px-8 mx-12 flex flex-col items-end"
          onSubmit={handleSubmit}
          id="register"
        >
          <label className="block py-1 w-[100%] font-medium">Name*</label>
          <input
            className="block p-1 w-[100%] rounded"
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChangeName}
            required
          ></input>
          <label className="block py-1 w-[100%] font-medium">
            Description*
          </label>
          <input
            className="block p-1 w-[100%] rounded"
            name="description"
            type="text"
            placeholder="Escribe aqui la descripcion"
            title=""
            onChange={handleChangeDescription}
            required
          ></input>
          <label className="block py-1 w-[100%] font-medium">Currency*</label>
          <div className="block w-[100%] rounded">
            <input
              className="p-1 w-[80%] rounded"
              onChange={handleChangeCurrency}
              name="currency"
              type="text"
              placeholder="Ingresa aqui la moneda"
              required
            ></input>
          </div>
          <label className="block py-1 w-[100%] font-medium">UnitAmount*</label>
          <input
            className="block p-1 w-[100%] rounded"
            name="unitAmount"
            type="number"
            placeholder="Ej: 1110"
            title="Unit Amount"
            min={0}
            step="1"
            required
            onChange={handleChangeUnitAmount}
          />
          <label className="block py-1 w-[100%] font-medium">Quantity*</label>
          <input
            className="block p-1 w-[100%] rounded"
            onChange={handleChangeQuantity}
            name="quantity"
            type="number"
            placeholder="Elije una cantidad"
            required
          ></input>
          <button
            className=" block bg-[#318F51] text-white rounded w-[124px] h-[40px] my-2 "
            type="submit"
          >
            Crear pago
          </button>
        </form>
      </div>
    </div>
  );
}
