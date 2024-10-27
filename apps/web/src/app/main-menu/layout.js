import { HeaderBooked } from "../components/headerBooked";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

export const metadata = {
  title: "Mi Menu",
  description: "configuración de Booked",
};

export default function MainMenuLayout({ children }) {
  return (
    <div className="grid grid-cols-[minmax(200px,250px)_minmax(700px,_1fr)]">
      <HeaderBooked />
      <SidebarProvider className="min-h-min">
        <AppSidebar />
      </SidebarProvider>
      {children}
    </div>
  );
}
