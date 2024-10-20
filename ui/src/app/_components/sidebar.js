"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { SidebarToggle } from "./sidebar-toggle";
import { useState } from "react";
// import GridPattern from "@/components/ui/grid-pattern";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
export function Sidebar() {
 
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      className={cn(
        " z-20 h-screen bg-background/[0.1] relative transition ease-in-out duration-300",
        isOpen === false ? "w-[90px]" : "w-72"
      )}
    >

      <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md z-10 dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/home" className="flex items-center justify-start gap-2">
            {/* <PanelsTopLeft className="w-6 h-6 mr-1" /> */}
            <img
              src="https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className={isOpen ? "h-8" : "h-6"}
            />
            {/* <h1
              className={cn(
                "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300",
                isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}
            >
              Credila
            </h1> */}
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    
       {/* <GridPattern
         x={-1}
         y={-1}
         className={cn(
           "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
         )}
       /> */}
     </aside>
  );
}
