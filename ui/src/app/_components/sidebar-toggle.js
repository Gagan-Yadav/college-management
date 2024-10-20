import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";



export function SidebarToggle({ isOpen, setIsOpen }) {
  return (
    <div className="invisible lg:visible absolute top-1/2 -right-[16px] z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md w-8 h-8"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0",
          )}
        />
      </Button>
    </div>
  );
}
