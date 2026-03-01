"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export function NavTabs({ items }) {
  const pathname = usePathname();

  return (
    <Tabs value={pathname}  className="w-full">
      <TabsList variant="line" className="bg-transparent border-b  tracking border-white/20 justify-start gap-6 h-auto p-0">
        {items.map((item) => (
          <TabsTrigger
            key={item.href}
            value={item.href}
            asChild
            className={`relative px-0 py-2 text-md
              transition-colors duration-300
              data-[state=active]:text-[#EAAA2A]
              after:hidden
              text-gray-300 hover:text-white
            `}
          >
            <Link href={item.href}>
              {item.label}
              {pathname === item.href && (
                <motion.div
                  layoutId="nav-tab-indicator"
                  className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#EAAA2A]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}