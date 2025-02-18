import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();
  const { open, isMobile } = useSidebar();

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
          <div className="aspect-auto w-16 relative">
            <Image height={24} width={56} src="/images/logo.png" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomSidebarTrigger;
