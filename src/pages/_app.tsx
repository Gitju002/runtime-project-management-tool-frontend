import { SidebarProvider } from "@/components/ui/sidebar";
import StoreProvider from "@/provider/store-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";
import { AdminSidebar } from "./admin/_components/admin-sidebar";
import { CustomSidebarTrigger } from "./admin/_components/sidebar-trigger";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <StoreProvider>
        <SidebarProvider>
          <div className="flex">
            <AdminSidebar />
            <Toaster />
            <main className="flex-1">
              <CustomSidebarTrigger />
              <Component {...pageProps} />
              <div className="fixed z-10 bottom-4 right-4">
                <ThemeToggle />
              </div>
            </main>
          </div>
        </SidebarProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
