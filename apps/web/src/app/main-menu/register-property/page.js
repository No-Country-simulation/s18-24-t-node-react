"use client";
import { Title } from "@/app/components/title-menu"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
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

const tags = [
  {
    id: "beachfront",
    label: "beachfront",
  },
  {
    id: "wifi",
    label: "wifi",
  },
  {
    id: "pets allowed",
    label: "pets allowed",
  },
  {
    id: "pool",
    label: "pool",
  },
  {
    id: "with furniture",
    label: "with furniture",
  },
  {
    id: "Smoking is allowed",
    label: "Smoking is allowed",
  },
]; 

const formSchema = z.object({
  title:z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  tags:z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function RegisterProperty(){
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: ["wifi"],
    },
  });

  function onSubmit(values, event) {
    event.preventDefault();
    console.log(values);
  }
  return(
        <div>
          <Title title="Agregar nueva propiedad" description="Agrega, edita o elimina tus publicaciones."/>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 bg-color_form_background rounded-md p-5"
            >
            <FormField
            control={form.control.title}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de inmueble</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Elegir" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="casa">casa</SelectItem>
                    <SelectItem value="departamento">departamento</SelectItem>
                    <SelectItem value="habitacion">habitacion</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.descrition}
            name="descrition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Ingrese una breve descripcion de la casa" {...field} />
                </FormControl>
                <FormDescription>
                  Breve descripcion que capte la atención.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.price}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Ingrese el precio del alquiler" {...field} />
                </FormControl>
                <FormDescription>
                  Precio del alquiler por dia
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control.max_people}
            name="max_people"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personas</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="Ingrese las personar admitidas" {...field} />
                </FormControl>
                <FormDescription>
                  Personas que entran en el alquiler
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control.tags}
          name="tags"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Detalles</FormLabel>
                <FormDescription>
                  Seleciona uno o varios items que detallen tu propiedad.
                </FormDescription>
              </div>
              {tags.map((tag) => (
                <FormField
                  key={tag.id}
                  control={form.control.tags}
                  name="tags"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={tag.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
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
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {tag.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control.pais}
            name="pais"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirreccion</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="País" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control.pais}
            name="provincia"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Provincia"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control.ciudad}
            name="ciudad"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="bg-white" placeholder="Ciudad" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control.calle}
            name="calle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Dirección (calle y numeración)"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control.avatar}
            name="avatar"
            render={() => (
              <FormItem>
                <FormLabel>Agregar fotos de la propiedad</FormLabel>
                <FormDescription>
                  Puedes subir hasta 20 archivos formato imagen .jpg o .png.
                </FormDescription>
                <FormControl>
                  <Input type="file" multiple accept="image/png, image/jpeg" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="bg-color_form_button text-white" type="submit">
            Cargar propiedad
          </Button>
            </form>
          </Form>
        </div>
    )
}