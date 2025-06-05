"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, Bookmark, BarChart3, Menu, X } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: Users,
      href: "/",
      active: pathname === "/",
    },
    {
      label: "Bookmarks",
      icon: Bookmark,
      href: "/bookmarks",
      active: pathname === "/bookmarks",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: pathname === "/analytics",
    },
  ]

  const closeSidebar = () => setIsOpen(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed z-50 top-4 left-4">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeSidebar} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b">
          <Link href="/" className="flex items-center" onClick={closeSidebar}>
            <Users className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold">HR Dashboard</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={closeSidebar} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="p-4 space-y-2">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} onClick={closeSidebar}>
                <Button
                  variant={route.active ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", route.active ? "bg-secondary" : "hover:bg-secondary/50")}
                >
                  <route.icon className="h-5 w-5 mr-3" />
                  {route.label}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
