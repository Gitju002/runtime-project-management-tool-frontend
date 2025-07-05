import { SidebarProvider } from "@/components/ui/sidebar";
import StoreProvider from "@/provider/store-provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Toaster } from "sonner";
import AdminSidebar from "./admin/_components/admin-sidebar";
import CustomSidebarTrigger from "./admin/_components/sidebar-trigger";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import UserLogout from "@/components/ui/user-logout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const showSidebarRoutes = [
    "/admin",
    "/admin/projects",
    "/admin/projects/project-details",
    "/admin/services",
    "/admin/type-description",
    "/admin/users",
    "/admin/analytics",
    "/profile",
  ];

  const showLogoutRoutes = ["/user"];

  const showThemeToggleRoutes = [
    "/admin",
    "/admin/projects",
    "/admin/services",
    "/admin/type-description",
    "/admin/users",
    "/admin/analytics",
    "/profile",
    "/user",
  ];

  const showSidebar = showSidebarRoutes.includes(router.pathname);
  const showLogout = showLogoutRoutes.includes(router.pathname);
  const showThemeToggle = showThemeToggleRoutes.includes(router.pathname);

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <StoreProvider>
        <SidebarProvider>
          <div className="flex">
            {showSidebar && <AdminSidebar />}
            <Toaster />
            <main className="flex-1">
              {showSidebar && <CustomSidebarTrigger />}
              <Component {...pageProps} />
              <div className="fixed z-10 bottom-4 right-4">
                {showThemeToggle && <ThemeToggle />}
              </div>
            </main>
            {showLogout && <UserLogout />}
          </div>
        </SidebarProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
