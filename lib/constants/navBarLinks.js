// constants/navigation.ts

import { Users, Phone, Home, LayoutGrid } from "lucide-react";
import ROUTES_PATH from "@/lib/constants/routePaths";

export const NAV_LINKS = [
  {
    name: "Home",
    href: ROUTES_PATH.HOME,
    icon: Home,
  },
  {
    name: "Contact",
    href: ROUTES_PATH.CONTACT,
    icon: Phone,
  },
  {
    name: "Category",
    icon: LayoutGrid,
    children: [
      {
        name: "Chocolates",
        href: "/category/chocolates",
      },
      {
        name: "Drinks",
        href: "/category/drinks",
      },
      {
        name: "Dry Fruits",
        href: "/category/dry-fruits",
      },
    ],
  },
  {
    name: "About",
    href: ROUTES_PATH.ABOUT,
    icon: Users,
  },
];