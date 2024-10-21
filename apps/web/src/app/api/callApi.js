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
