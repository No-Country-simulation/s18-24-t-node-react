import "./login.css";

export const metadata = {
  title: "Bienvenido a Booked",
  description: "login/registro a Booked",
};

export default function loginLayaout({ children }) {
  return (
    <>
      <header
        className="w-full p-2 flex-row shadow-md"
        style={{ backgroundColor: "#5FA777", alignContent: "center" }}
      >
        <h1 className="text-7xl text-white">Booked</h1>
      </header>
      {children}
    </>
  );
}
