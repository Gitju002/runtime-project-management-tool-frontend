import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Car } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { startTour } from "@/driver";
import { useRouter } from "next/router";
function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  const { open, isMobile } = useSidebar();
  const router = useRouter();

  return (
    <div
      className={cn(
        " sticky z-10 mx-auto",
        isMobile ? "top-0" : "top-2 container"
      )}
    >
      <div
        className={cn(
          " bg-slate-200/40 dark:bg-slate-600/30 border border-white/20 rounded-md p-2 w-full backdrop-blur-sm flex justify-between items-center shadow-slate-600/20 shadow-md dark:shadow-slate-shade/40",
          isMobile && "rounded-none"
        )}
      >
        <Button
          className={cn(
            "transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:text-lime-shade hover:shadow-teal-shade/35 border-none",
            isMobile ? "hidden" : "flex"
          )}
          variant={"outline"}
          size={"icon"}
          onClick={toggleSidebar}
        >
          {open ? <ArrowLeft /> : <ArrowRight />}
        </Button>

        <Button
          className={cn(
            "transition-all duration-200 bg-teal-shade text-lime-shade hover:shadow-lg hover:bg-teal-shade hover:text-lime-shade hover:shadow-teal-shade/35 border-none",
            isMobile ? "flex" : "hidden"
          )}
          variant={"outline"}
          size={"icon"}
          onClick={toggleSidebar}
        >
          <ArrowRight />
        </Button>
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
    </div>
  );
}

export default CustomSidebarTrigger;
