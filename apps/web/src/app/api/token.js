// Guardar el token en localStorage
export const saveToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Obtener el token de localStorage
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Guardar el token en sessionStorage (si prefieres usar sessionStorage)
  // export const saveToken = (token) => {
  //   sessionStorage.setItem('token', token);
  // };
  
  // Obtener el token de sessionStorage (si prefieres usar sessionStorage)
  // export const getToken = () => {
  //   return sessionStorage.getItem('token');
  // };
  