"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Title } from "@/app/components/title-menu";

const formSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(50),
  birthDate: z.string(),
  email: z.string(),
  nationality: z.string(),
  avatar: z.string(),
});

export default function Profile() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      birthDate: new Date(),
    },
  });

  function onSubmit(values, event) {
    event.preventDefault();
    console.log(values);
  }
  return (
    <div>
      <Title title="Mi Perfil" description="Completa o edita tu informacion personal"/>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-color_form_background rounded-md p-5"
        >
          <FormField
            control={form.control.username}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="nombre" {...field} />
                </FormControl>
                <FormDescription>
                  Ingresa tu nombre tal como figura en el documento de identidad
                  de tu país.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.birthDate}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl>
                  <Input className="bg-white" type="date" {...field} />
                </FormControl>
                <FormDescription>
                  La fecha de nacimiento es usada para comprobar tu edad.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.email}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="bg-white" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  Este es tu email predeterminado, nos contactaremos contigo por
                  este medio.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.nationality}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nacionalidad</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  La que figura en tu documento de identidad.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.avatar}
            name="avatar"
            render={() => (
              <FormItem>
                <FormLabel>Agregar o editar foto de perfil</FormLabel>
                <FormDescription>
                  Puedes subir una foto de hasta XXmb, en formato .jpg o .png.
                </FormDescription>
                <Avatar className="w-16 h-16">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Booked</AvatarFallback>
                </Avatar>
                <FormControl>
                  <Input type="file" accept="image/png, image/jpeg" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="bg-[#318F51] text-white" type="submit">
            Actualizar
          </Button>
        </form>
      </Form>
    </div>
  );
}
