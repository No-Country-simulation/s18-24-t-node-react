const API = process.env.NEXT_PUBLIC_API_URL;

export async function userRegister(newUser) {
  const response = await fetch(`${API}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  return response;
}

export async function paymentStripe(newPayment) {
  // Convertimos unitAmount y quantity a números antes de enviarlos
  const sanitizedPayment = {
    ...newPayment,
    unitAmount: Number(newPayment.unitAmount),
    quantity: Number(newPayment.quantity),
  };

  try {
    const response = await fetch(`${API}/payments/createPaymentSession`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedPayment),
    });

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
