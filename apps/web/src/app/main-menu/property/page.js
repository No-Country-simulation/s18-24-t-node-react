"use client";
import { Title } from "@/app/components/title-menu";
import { Button } from "@/components/ui/button";
import { School } from "lucide-react";
import { GuestHost } from "@/app/components/Guest-Host";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Property() {
  const router = useRouter();
  const [show, setShow] = useState(false)
  const [render, setRender] = useState(
    <div className="w-[100%] h-[600px] bg-color_form_background flex flex-col items-center justify-center">
        <School size={83} color="#318f51" strokeWidth={1} />
        <p className="text-color_text_second mt-5 mb-10">
          Aún no has publicado ningún inmueble.
        </p>
        <Button
          className="bg-color_form_button text-white"
          onClick={handleClick}
        >
          Agregar nueva
        </Button>
      </div>
  )
  var property = [];

  function handleClick(e) {
    e.preventDefault();
    setShow(true);
    router.push("register-property")
    //setRender(<GuestHost />);
  }
  return (
    <div >
      <Title
        title="Mis propiedades"
        description="Agrega, edita o elimina tus publicaciones como anfitrión."
        hidden={show}
      />
      {render}
    </div>
  );
}
