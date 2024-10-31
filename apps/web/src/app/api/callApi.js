import { getToken } from "./token";
const API = process.env.NEXT_PUBLIC_API_URL;
const token = getToken();

export async function userRegister(newUser) {
  try {
    const response = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const errorDetails = await response.json()
      throw new Error(errorDetails.message)
    }

    const data = await response.json();

    return data

    // return { show: true, message: "Registro exitoso", type: "success" };
  } catch (error) {
    throw error
  }
}

export async function newProperty(property) {
  try {
    var propertyfilter = {
      title: property.title,
      description: property.description,
      price: Number(property.price),
      max_people: Number(property.max_people),
      tags: property.tags,
      photos: property.photos,
    };
    const formData = new FormData();
    formData.append("title", String(propertyfilter.title));
    formData.append("description", propertyfilter.description);
    formData.append("price", propertyfilter.price);
    formData.append("max_people", propertyfilter.max_people);
    propertyfilter.tags.forEach((tag, index) => {
      formData.append("tags[]", tag);
    });
    propertyfilter.photos.forEach((file, index) => {
      formData.append("photos", file);
    });
    console.log("datos enviados", formData);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value} ${typeof value}`);
    });
    const response = await fetch(`${API}/property/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorDetails = await response.json(); // Captura más detalles del error
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorDetails.message}`
      );
    }
    const data = await response.json();
    return { show: true, message: "Registro exitoso", type: "success" };
  } catch (error) {
    const message = error.message;
    if (Array.isArray(message)) {
      let lista = [];
      message.forEach((element, index) => {
        lista.push(<p key={index}>{element}</p>);
      });
      return { show: true, message: lista, type: "error" };
    } else {
      return { show: true, message: message, type: "error" };
    }
  }
}

export async function paymentStripe(newPayment) {
  const sanitizedPayment = {
    ...newPayment,
    unitAmount: Number(newPayment.unitAmount),
    quantity: Number(newPayment.quantity) || 1,
    currency: newPayment.currency?.toUpperCase() || "USD",
  };
  try {
    const response = await fetch(
      `http://localhost:3001/payments/createPaymentSession`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedPayment),
      }
    );
    if (!response.ok) {
      console.error("Error al registrar el pago", response.status);
      return null;
    }

    const data = await response.json();

    if (data && data.url) {
      return data.url;
    } else {
      console.error(
        "Error al registrar el pago: No se recibió una URL",
        response.status
      );
      return null;
    }
  } catch (error) {
    console.error("Error al registrar el pago", error);
    return null;
  }
}
//
