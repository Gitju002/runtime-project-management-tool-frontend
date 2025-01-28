import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function CustomSidebarTrigger() {
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
          " bg-slate-200/40  rounded-md p-2 w-full backdrop-blur-sm",
          isMobile && "rounded-none"
        )}
      >
        <Button
          className={cn("", isMobile ? "hidden" : "flex")}
          variant={"outline"}
          size={"icon"}
          onClick={toggleSidebar}
        >
          {open ? <ArrowLeft /> : <ArrowRight />}
        </Button>
        <Button
          className={cn("", isMobile ? "flex" : "hidden")}
          variant={"outline"}
          size={"icon"}
          onClick={toggleSidebar}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
