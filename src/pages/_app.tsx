import { SidebarProvider } from "@/components/ui/sidebar";
import StoreProvider from "@/provider/store-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import { AdminSidebar } from "./admin/_components/admin-sidebar";
import { Sidebar } from "lucide-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <SidebarProvider>
        <div className="flex">
          <AdminSidebar />
          <Toaster />
          <main className="flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      </SidebarProvider>
    </StoreProvider>
  );
}
