"use client"
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MoreHorizontal, User } from "lucide-react";
import Cookies from 'js-cookie'

const TopNavbar = () => {
  const pathname = usePathname()
  const paths = pathname.split("/").splice(1)
  const username = Cookies.get("username")

  return (
    <header className="sticky py-3 top-0 z-30 flex justify-between h-16 items-center gap-4 border-b bg-white px-6 shadow-md">
      <div className="flex items-center justify-between w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-indigo-600 font-semibold">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {paths[0] !== "home" && <BreadcrumbSeparator />}
            {paths[0] !== "home" && (
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${paths[0]}`} className="capitalize text-gray-600 hover:text-indigo-600 transition-colors">
                  {paths[0]}
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center space-x-4">
          {/* <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 ring-2 ring-indigo-500 font-bold">
                  <AvatarImage src="/avatars/01.png" alt="@johndoe" />
                  <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{username?.charAt(0).toUpperCase() + username?.slice(1)}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MoreHorizontal className="mr-2 h-4 w-4" />
                <span>More</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default TopNavbar
