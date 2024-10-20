"use client";
import React from "react";

import { usePathname, useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";



const TopNavBar = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").splice(1);
  return (
    <div>
      <header className="sticky    py-3 top-0 z-30 flex justify-between  h-14 items-center gap-4 border-b bg-background px-4 ">
                <div className="flex items-center justify-between w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {paths[0] != "home" && <BreadcrumbSeparator />}
              {paths[0] != "home" && (
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${paths[0]}`}>
                    {paths[0]}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>

        </div>
            </header>
    </div>
  );
};

export default TopNavBar;
