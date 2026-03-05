"use client";

import { NAV_LINKS } from "@/lib/constants/navBarLinks";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";

export function NavbarContent() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-24 relative">

        {/* Desktop Links */}
        <div className="hidden md:flex  items-center gap-8">
          {NAV_LINKS.map((link) => {
            if (link.children) {
              return (
                <div key={link.name} className="relative group">
                  <span className="cursor-pointer nav-link">
                    {link.name}
                  </span>

                  {/* Dropdown */}
                  <div className="absolute top-full left-0 mt-3 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">
                    {link.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link key={link.name} href={link.href} className="nav-link">
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-72">
              <div className="flex flex-col gap-6 mt-8">
                {NAV_LINKS.map((link) => {
                  if (link.children) {
                    return (
                      <div key={link.name}>
                        <p className="font-semibold">{link.name}</p>

                        <div className="flex flex-col ml-4 mt-2 gap-2">
                          {link.children.map((child) => (
                            <Link key={child.name} href={child.href}>
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link key={link.name} href={link.href}>
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={70}
              height={70}
            />
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpenSearch(!openSearch)}
          >
            {openSearch ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </Button>

          {/* Account */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="w-5 h-5" />
            </Link>
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                2
              </span>
            </Link>
          </Button>

        </div>
      </div>

      {/* Animated Search */}
      <AnimatePresence>
        {openSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="pb-4"
          >
            <Input placeholder="Search products..." />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}