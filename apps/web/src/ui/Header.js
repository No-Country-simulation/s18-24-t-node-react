"use client";

import Image from "next/image";
import { REM } from "next/font/google";

const rem = REM({
  subsets: ["latin"],
  weight: ["400"],
});

import userImage from "../app/public/Perfil.png";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBoundStore } from "@/store/bound.store";

export const Header = () => {
  const hasToken = window.localStorage.getItem("token");

  return (
    <header className="relative w-full h-[110px] top-0 overflow-hidden bg-[#5FA777] px-8 shadow-2xl">
      <div className="flex h-full justify-between items-center pr-10">
        {/*<Link href={'/'} className='text-5xl font-bold text-white hover:text-opacity-70'>Booked</Link>*/}
        <Link href={"/"} className="flex flex-row ">
          <h1
            className={rem.className}
            style={{
              fontSize: "70px",
              color: "white",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            Booked
          </h1>
          <svg
            width="110"
            height="93"
            viewBox="0 0 149 113"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M48.0725 19.4397L56.0499 24.5127L11.4548 96.1656L1.77946 96.1656L48.0725 19.4397Z"
              fill="#318F51"
            />
            <path
              d="M83.3333 46.8283L118.333 13.3282L121.455 13.3282L100.333 65.3283L83.3333 46.8283Z"
              fill="#318F51"
            />
            <path
              d="M121.455 13.3284L147.955 64.3283L143.955 64.3283L117.455 15.2042L121.455 13.3284Z"
              fill="#318F51"
            />
            <rect x="40" y="56" width="23" height="18" fill="#318F51" />
            <rect
              x="117.455"
              y="46.3284"
              width="12"
              height="10"
              fill="#318F51"
            />
            <path
              d="M47.4543 20.3283L52.4543 12.3282L128.954 96.3282L91.4543 96.3282L47.4543 20.3283Z"
              fill="#318F51"
            />
          </svg>
        </Link>
        {hasToken ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Image src={userImage} alt="Perfil" width={70} height={70} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-[#5FA777] w-[180px]">
              <DropdownMenuItem className="text-white flex justify-center">
                <Link href={"/main-menu/profile"}>Mi perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white flex justify-center">
                <Link href={"/main-menu/register-property"}>
                  Cargar una propiedad
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-white flex justify-center">
                <Link
                  onClick={() => window.localStorage.removeItem("token")}
                  href={"/auth/login"}
                >
                  Cerrar sesión
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="w-1/8 flex gap-7">
            <Link href={"/auth/login"} className="px-5 py-2 bg-white text-[#5FA777] rounded-xl">Login</Link>
            <Link href={"/auth/register"} className="px-5 py-2 bg-white text-[#5FA777] rounded-xl">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};
