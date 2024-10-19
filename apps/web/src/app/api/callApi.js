const API = "http://localhost:3001"

export async function userRegister(newUser) {
    const response = await fetch(`${API}/users/register`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
    });
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      console.log(response.json());
  
      return response.json();
}