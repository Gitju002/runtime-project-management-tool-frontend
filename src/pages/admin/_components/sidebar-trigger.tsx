import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Car, PanelRightClose } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { startTour } from "@/driver";
import { useRouter } from "next/router";
import { useGetUserQuery } from "@/store/api/user";
import { useEffect, useMemo } from "react";
function CustomSidebarTrigger() {
  const { data: userData, isLoading, refetch: refetchUser } = useGetUserQuery();
  const { toggleSidebar } = useSidebar();
  const { isMobile } = useSidebar();
  const router = useRouter();

  const isAdmin = useMemo(() => {
    return (
      userData?.data?.role_name?.toLowerCase() ===
      process.env.NEXT_PUBLIC_ADMIN_ROLE?.toLowerCase()
    );
  }, [userData]);

  useEffect(() => {
    refetchUser();
  }, [userData?.data?.role_name]);

  if (isLoading) {
    return (
      <div
        className={cn(
          "sticky z-50 mx-auto",
          isMobile ? "top-0" : "top-2 container"
        )}
      >
        <div
          className={cn(
            " bg-slate-200/40 dark:bg-slate-600/30 border border-white/20 rounded-md p-2 w-full backdrop-blur-sm flex justify-between items-center shadow-slate-600/20 shadow-md dark:shadow-slate-shade/40",
            isMobile && "rounded-none"
          )}
        >
          {/* Skeleton for Toggle Sidebar Button */}
          <Skeleton className="h-10 w-10 rounded-md" />

          {/* Skeleton for right side content */}
          <div className="flex items-center gap-6">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-6 w-14 rounded" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "sticky z-50 mx-auto",
        isMobile ? "top-0" : "top-2 container"
      )}
    >
      {isAdmin && (
        <div
          className={cn(
            " bg-slate-200/40 dark:bg-slate-600/30 border border-white/20 rounded-md p-2 w-full backdrop-blur-sm flex justify-between items-center shadow-slate-600/20 shadow-md dark:shadow-slate-shade/40",
            isMobile && "rounded-none"
          )}
        >
          {/* Toggle Sidebar Button */}
          <Button
            className={
              "flex transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:text-lime-shade hover:shadow-teal-shade/35 border-none"
            }
            variant={"outline"}
            size={"icon"}
            onClick={toggleSidebar}
          >
            <PanelRightClose />
          </Button>

          {/* Start Tour Button */}
          <div className="flex items-center gap-6">
            {router.pathname === "/admin" && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={() => startTour(router)}
                  className="transition-all duration-200 border border-teal-shade dark:border-lime-shade bg-transparent text-teal-shade dark:text-lime-shade  hover:shadow-lg hover:bg-transparent dark:hover:shadow-lime-shade/35 hover:shadow-teal-shade/35"
                >
                  Start Tour <Car />
                </Button>
              </motion.div>
            )}
            <div className="aspect-auto w-16 relative">
              <Image height={24} width={56} src="/images/logo.png" alt="logo" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomSidebarTrigger;
