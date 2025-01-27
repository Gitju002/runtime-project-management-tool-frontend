"use client";

import {
  Home,
  BookType,
  FolderKanban,
  Briefcase,
  Users,
  BarChart2,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/admin" },
  { icon: FolderKanban, label: "Projects", href: "/admin/projects" },
  { icon: BookType, label: "Project Types", href: "/admin/project-types" },
  { icon: Briefcase, label: "Services", href: "/admin/services" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle state

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Sidebar
        className={`fixed top-0 left-0 h-screen border-r transition-all duration-300 bg-white ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="h-full flex flex-col gap-4 ">
          <SidebarHeader className="h-16 gap-2  flex flex-row-reverse justify-between items-center px-4">
            {isOpen ? (
              <Button
                variant={"outline"}
                size={"icon"}
                className=" top-2 right-2"
                onClick={toggleSidebar}
              >
                <SidebarCloseIcon />
              </Button>
            ) : (
              <Button variant={"outline"} size={"icon"} onClick={toggleSidebar}>
                <SidebarOpenIcon onClick={toggleSidebar} />
              </Button>
            )}
            {isOpen && (
              <div className=" text-sm md:text-lg font-bold ml-4">
                Admin Dashboard
              </div>
            )}
          </SidebarHeader>
          <SidebarContent className="max-h-96  flex flex-col justify-center ">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="flex  flex-col gap-2 ">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(item.href)}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center px-4 py-3 rounded-lg ${
                            pathname.startsWith(item.href)
                              ? "bg-blue-100 text-blue-500"
                              : "text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <item.icon className="w-6 h-6" />
                          {isOpen && <span className="ml-4">{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </div>
      </Sidebar>
    </>
  );
}
