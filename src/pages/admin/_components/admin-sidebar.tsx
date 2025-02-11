import {
  Home,
  BookType,
  FolderKanban,
  Briefcase,
  Users,
  BarChart2,
  ChevronUp,
  UserCircle2,
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
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useLogoutMutation } from "@/store/api/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/store/features/userInfo";
import { useGetUserQuery } from "@/store/api/user";

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
    icon: Briefcase,
    title: "Services",
    label: "Services",
    href: "/admin/services",
  },
  {
    icon: BookType,
    title: "Type Description",
    label: "Type Description",
    href: "/admin/type-description",
  },

  {
    icon: Users,
    title: "Users",
    label: "Users",
    href: "/admin/users",
  },
  // {
  //   icon: BarChart2,
  //   title: "Analytics",
  //   label: "Analytics",
  //   href: "/admin/analytics",
  // },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserQuery();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  console.log(userData);

  const handleLogout = () => {
    logout();
    dispatch(clearUserInfo());
    router.push("/login");
  };

  const handleGetProfile = () => {
    router.push("/profile");
  };
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup className="space-y-28">
          <SidebarGroupLabel className="text-sm md:text-base transition-all duration-300">
            Dashbaord Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex gap-y-4 ">
              {loading
                ? items.map((item) => <SidebarMenuSkeleton key={item.title} />)
                : items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                      >
                        <Link href={item.href ?? "/admin"}>
                          <item.icon className="!size-5 text-teal-shade dark:text-lime-shade" />
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
                  <UserCircle2 className="text-teal-shade dark:text-lime-shade dark:hover:text-lime-shade" />{" "}
                  {userData?.data?.name}
                  <ChevronUp className="ml-auto text-teal-shade dark:text-lime-shade dark:hover:text-lime-shade" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleGetProfile}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
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
