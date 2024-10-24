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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Title } from "@/app/components/title-menu";

const formSchema = z.object({});

export function GuestHost() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values, event) {
    event.preventDefault();
    console.log(values);
  }
  return (
    <div>
      <Title
        title="Convertirme en anfitrión"
        description="Carga correctamente tus datos para que podamos validarte como propietario."
      />
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
                <FormLabel>Número de cuenta bancaria</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="Ingresa aquí los números de una cuenta para poder realizar cobros."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  La cuenta bancaria debe ser a tu nombre.
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
                <FormLabel>
                  Foto de tu documento de identidad/pasaporte.
                </FormLabel>
                <FormDescription>
                  Sube foto de frente y dorso de tu documento.
                </FormDescription>
                <FormControl>
                  <Input type="file" multiple accept="image/png, image/jpeg" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control.avatar}
            name="avatar"
            render={() => (
              <FormItem>
                <FormLabel>Selfie / foto actualizada</FormLabel>
                <FormDescription>
                  Por favor sube una selfie para que podamos validar tu
                  identidad.
                </FormDescription>
                <FormControl>
                  <Input type="file" accept="image/png, image/jpeg" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control.avatar}
            name="avatar"
            render={() => (
              <FormItem>
                <FormLabel>
                  Factura o recibo de algún servicio a tu nombre.
                </FormLabel>
                <FormDescription>
                  Para constatar que la propiedad es tuya, debemos pedirte un
                  recibo a tu nombre de algun servicio (ejemplo: luz, gas,
                  agua).
                </FormDescription>
                <FormControl>
                  <Input type="file" accept="image/png, image/jpeg" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control.avatar}
            name="avatar"
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
  );
}
