import {
    Tag,
    Users,
    Settings,
    Bookmark,
    SquarePen,
    LayoutGrid,
    LucideIcon,
    ClipboardList,
    TableIcon,
  } from "lucide-react";
  
  
  
  export function getMenuList(pathname) {
    return [
      {
        groupLabel: "",
        menus: [
          {
            href: "/home",
            label: "Home",
            active: pathname.includes("/home"),
            icon: LayoutGrid,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Contents",
        menus: [
          {
            href: "",
            label: "User Pool",
            active: pathname.includes("/user-management"),
            icon: SquarePen,
            submenus: [
              {
                href: "/user-management/team",
                label: "Team",
                active: pathname === "/user-management/team",
              },
              {
                href: "/user-management/our-organization",
                label: "Organisation",
                active: pathname === "/user-management/our-organization",
              },
            ],
          },
          {
            href: "/search",
            label: "Case Search",
            active: pathname.includes("/search"),
            icon: Bookmark,
            submenus: [],
          },
          {
            href: "/co-pilot",
            label: "Co Pilot",
            active: pathname.includes("/co-pilot"),
            icon: Tag,
            submenus: [],
          },
          {
            href: "/quality-checks",
            label: "Quality Checks",
            active: pathname.includes("/quality-checks"),
            icon: ClipboardList,
            submenus: [],
          },
        ],
      },
      {
        groupLabel: "Settings",
        menus: [
          {
            href: "/account",
            label: "Account",
            active: pathname.includes("/account"),
            icon: Settings,
            submenus: [],
          },
          {
            href: "/score-panel?page=1",
            label: "Score Panel",
            active: pathname.includes("/score-panel?page=1"),
            icon: TableIcon,
            submenus: [],
          },
        ],
      },
    ];
  }
  