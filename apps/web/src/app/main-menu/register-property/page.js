"use client";
import { Title } from "@/components/title-menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { AlertPopup } from "@/components/Alert";
import { newProperty } from "@/app/api/callApi";
import { CldUploadWidget } from "next-cloudinary";
import Autocomplete from "@/components/ui/Autocomplete";

const tags = [
  {
    id: "beachfront",
    label: "Playa en frente",
  },
  {
    id: "wifi",
    label: "Wifi",
  },
  {
    id: "pets allowed",
    label: "Se permiten mascotas",
  },
  {
    id: "pool",
    label: "Piscina",
  },
  {
    id: "with furniture",
    label: "Amueblada",
  },
  {
    id: "Smoking is allowed",
    label: "Se permite fumar",
  },
  {
    id: "private parking",
    label: "Estacionamiento Privado",
  },
  {
    id: "workspace",
    label: "Espacio de trabajo",
  },
];

const fileSchema = z
  .instanceof(File)
  .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {
    message: "El archivo debe ser un JPEG/JPG o PNG",
  });

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Selecciona una opcion",
  }),
  description: z
    .string()
    .min(10, { message: "muy corta la descripcion" })
    .max(300, { message: "no debe superar los 300 caracteres" }),
  price: z.string(),
  max_people: z.string(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "selecciona al menos un item",
  }),
  direccion: z.string().isOptional(),
  photos: z.array(fileSchema),
});

export default function RegisterProperty() {
  const [resource, setResource] = useState();
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "0",
      max_people: "1",
      tags: ["wifi"],
      pais: "",
      provincia: "",
      ciudad: "",
      calle: "",
      photos: [],
    },
  });

  async function newProperty(data) {
    const response = await fetch("http://localhost:3001/property/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  function onSubmit(values, event) {
    event.preventDefault();

    // Valido los datos ingresados con safeParse y me dice si se cargó correctamente
    /* const validationResult = formSchema.safeParse(values);
    if (!validationResult.success) {
      console.log(values);
      console.error(validationResult.error);
      setAlert({
        show: true,
        message: "Error al validar los datos",
        type: "error",
      });
    } else {
      // Incluye las coordenadas en el objeto de datos a enviar
    } */

    const dataToSend = {
      ...validationResult.data,
      coordinates: {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      },
    };

    console.log(dataToSend);
    console.log("Form submitted successfully!", validationResult.data);

    // Realiza la petición POST
    newProperty(dataToSend)
      .then((result) => {
        // Manejo de la respuesta del servidor
        if (result.message === "Registro exitoso") {
          setAlert({
            show: true,
            message: "Registro exitoso",
            type: "success",
          });
          //setTimeout(() => router.push("/auth/login"), 10000);
        } else {
          setAlert({
            show: true,
            message: result.message || "Error al registrar la propiedad",
            type: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        setAlert({
          show: true,
          message: "Error en la solicitud",
          type: "error",
        });
      });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 3000);
  }

  const handleSelect = (location) => {
    console.log(`Latitud: ${location.lat}, Longitud: ${location.lon}`);
  };

  return (
    <div className="mx-auto">
      <Title
        title="Agregar nueva propiedad"
        description="Agrega, edita o elimina tus publicaciones."
      />
      {alert.show && <AlertPopup message={alert.message} type={alert.type} />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-color_form_background rounded-md p-5" // Cambié a space-y-4 para más separación
        >
          <FormField
            control={form.control.title}
            name="title"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Tipo de inmueble</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Elegir" {...field} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="departamento">Departamento</SelectItem>
                    <SelectItem value="habitacion">Habitacion</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.description}
            name="description"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ingrese una breve descripcion de la casa"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Breve descripcion que capte la atención.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.direccion}
            name="direccion"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Dirección (autocompletado)</FormLabel>
                <FormControl>
                  <Autocomplete onSelect={handleSelect} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control.price}
            name="price"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="number"
                    pattern="\d*"
                    minLength="1"
                    maxLength="10"
                    title="Por favor, ingresa solo números enteros."
                    placeholder="Ingrese el precio del alquiler"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Precio del alquiler por dia</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.max_people}
            name="max_people"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Personas (Máx)</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="text"
                    pattern="^[1-9][0-9]{0,2}$"
                    minLength="1"
                    maxLength="3"
                    title="Por favor, ingresa solo números enteros desde el 1"
                    placeholder="Ingrese las personas admitidas"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Máximo de personas que entran en el alquiler
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.tags}
            name="tags"
            render={({ field }) => (
              <FormItem className="mb-4">
                <div className="mb-4">
                  <FormLabel>Detalles</FormLabel>
                  <FormDescription>
                    Selecciona uno o varios items que detallen tu propiedad.
                  </FormDescription>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                  {tags.map((tag) => (
                    <FormField
                      key={tag.id}
                      control={form.control.tags}
                      name="tags"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={tag.id}
                            className="flex flex-col items-center m-2" // Centrado
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, tag.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== tag.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal text-center">
                              {tag.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photos"
            render={() => (
              <FormItem className="mt-5">
                <FormLabel>Agregar fotos de la propiedad</FormLabel>
                <FormDescription>
                  Puedes subir hasta 20 archivos formato imagen .jpg o .png.
                </FormDescription>
                <CldUploadWidget
                  signatureEndpoint="/api/cloudinary"
                  onSuccess={(result, { widget }) => {
                    setResource(result?.info);
                    setFiles((prevFiles) => [...prevFiles, result.info.url]);
                    console.log(files);
                  }}
                  onQueuesEnd={(result, { widget }) => {
                    widget.close();
                  }}
                >
                  {({ open }) => {
                    return (
                      <button
                        className="bg-color_form_button text-white mt-5 rounded-md py-2 px-4"
                        onClick={() => open()}
                      >
                        Agregar fotos
                      </button>
                    );
                  }}
                </CldUploadWidget>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end w-[90%]">
            <Button
              className="bg-color_form_button text-white mt-5"
              type="submit"
            >
              Registrar propiedad
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
