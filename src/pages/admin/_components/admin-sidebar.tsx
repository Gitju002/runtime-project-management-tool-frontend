import {
  Home,
  BookType,
  FolderKanban,
  Briefcase,
  Users,
  BarChart2,
  SidebarCloseIcon,
  SidebarOpenIcon,
  User2,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { CustomSidebarTrigger } from "./sidebar-trigger";

// Menu items.
const items = [
  {
    icon: Home,
    title: "Home",
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: FolderKanban,
    title: "Projects",
    label: "Projects",
    href: "/admin/projects",
  },
  {
    icon: BookType,
    title: "Project Types",
    label: "Project Types",
    href: "/admin/project-types",
  },
  {
    icon: Briefcase,
    title: "Services",
    label: "Services",
    href: "/admin/services",
  },
  {
    icon: Users,
    title: "Users",
    label: "Users",
    href: "/admin/users",
  },
  {
    icon: BarChart2,
    title: "Analytics",
    label: "Analytics",
    href: "/admin/analytics",
  },
];

export function AdminSidebar() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const pathname = usePathname();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashbaord Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {loading
                ? items.map((item) => <SidebarMenuSkeleton key={item.title} />)
                : items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                      >
                        <Link href={item.href ?? "/admin"}>
                          <item.icon className="!size-5" />
                          <span className="text-sm md:text-base">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Theme</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
