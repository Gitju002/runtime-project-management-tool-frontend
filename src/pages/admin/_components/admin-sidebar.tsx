import {
  Home,
  BookType,
  FolderKanban,
  Briefcase,
  Users,
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

export default function AdminSidebar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const {
    data: userData,
    isLoading: userLoading,
    refetch: refetchUser,
  } = useGetUserQuery();
  // const [logout] = useLogoutMutation();
  // const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    refetchUser();
  }, [userData?.data?.role_name]);

  const handleLogout = () => {
    // logout();
    // dispatch(clearUserInfo());
    router.push("/logout");
  };

  const handleGetProfile = () => {
    router.push("/profile");
  };
  if (
    userData?.data?.role_name?.toLowerCase() ===
    process.env.NEXT_PUBLIC_ADMIN_ROLE?.toLowerCase()
  ) {
    return (
      <Sidebar variant="floating" collapsible="icon">
        <SidebarContent>
          <SidebarGroup className="space-y-28">
            <SidebarGroupLabel className="text-sm md:text-base transition-all duration-300">
              Dashboard Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex gap-y-4">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/admin"}>
                    <Link id="sidebar_home" href="/admin">
                      <Home className="!size-5 text-teal-shade dark:text-lime-shade" />
                      <span className="text-sm md:text-base">Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/admin/projects"}
                  >
                    <Link id="sidebar_projects" href="/admin/projects">
                      <FolderKanban className="!size-5 text-teal-shade dark:text-lime-shade" />
                      <span className="text-sm md:text-base">Projects</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/admin/services"}
                  >
                    <Link id="sidebar_services" href="/admin/services">
                      <Briefcase className="!size-5 text-teal-shade dark:text-lime-shade" />
                      <span className="text-sm md:text-base">Services</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/admin/type-description"}
                  >
                    <Link id="sidebar_typeDesc" href="/admin/type-description">
                      <BookType className="!size-5 text-teal-shade dark:text-lime-shade" />
                      <span className="text-sm md:text-base">
                        Type Description
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === "/admin/users"}
                  >
                    <Link id="sidebar_users" href="/admin/users">
                      <Users className="!size-5 text-teal-shade dark:text-lime-shade" />
                      <span className="text-sm md:text-base">Users</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    );
  } else {
    return null;
  }
}
