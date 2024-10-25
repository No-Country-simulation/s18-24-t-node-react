const API = process.env.NEXT_PUBLIC_API_URL;

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
      const errorDetails = await response.json(); // Captura más detalles del error
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorDetails.message}`);
    }
    const data = await response.json();
    return { show: true, message: "Registro exitoso", type: "success" }
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

