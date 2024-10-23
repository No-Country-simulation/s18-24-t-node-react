
import { HeaderBooked } from "../components/headerBooked";


export const metadata = {
  title: "Bienvenido a Booked",
  description: "login/registro a Booked",
};

export default function Layout({ children }) {
  return (
    <>
      <HeaderBooked/>
      {children}
    </>
  );
}
