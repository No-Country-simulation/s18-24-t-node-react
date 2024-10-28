import { REM } from "next/font/google";
import Link from "next/link";

const rem = REM({
  subsets: ["latin"],
  weight: ["400"],
});

export function HeaderBooked() {
  return (
    <header
      className="w-full h-[100px] flex-row shadow-md"
      style={{ backgroundColor: "#5FA777", alignContent: "center" }}
    >
      <Link href={"/auth/login"}>
        <h1
          className={rem.className}
          style={{ fontSize: "70px", color: "white", marginLeft: "20px" }}
        >
          Booked
        </h1>
      </Link>
    </header>
  );
}
