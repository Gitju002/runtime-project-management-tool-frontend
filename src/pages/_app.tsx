import { SidebarProvider } from "@/components/ui/sidebar";
import StoreProvider from "@/provider/store-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import { AdminSidebar } from "./admin/_components/admin-sidebar";
import { CustomSidebarTrigger } from "./admin/_components/sidebar-trigger";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <SidebarProvider>
        <div className="flex">
          <AdminSidebar />
          <Toaster />
          <main className="flex-1">
            <CustomSidebarTrigger />
            <Component {...pageProps} />
          </main>
        </div>
      </SidebarProvider>
    </StoreProvider>
  );
}
