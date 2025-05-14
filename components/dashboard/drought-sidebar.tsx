'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Cloud,
  Droplets,
  Home,
  Map,
  MonitorSmartphone,
  Users,
  Bell,
  FileText,
  Settings,
  Pencil,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Drought Monitor",
    href: "/dashboard/drought",
    icon: <Cloud className="h-5 w-5" />,
  },
  {
    title: "Drought Annotation",
    href: "/dashboard/annotation",
    icon: <Pencil className="h-5 w-5" />,
  },
  {
    title: "Land Use Analysis",
    href: "/dashboard/drought#land-use",
    icon: <Map className="h-5 w-5" />,
  },
  {
    title: "Groundwater Analysis",
    href: "/dashboard/drought#groundwater",
    icon: <Droplets className="h-5 w-5" />,
  },
  {
    title: "Piplistans",
    href: "/dashboard/piplistans",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Cache",
    href: "/dashboard/cache",
    icon: <Settings className="h-5 w-5" />,
  },
]

interface DroughtSidebarProps {
  className?: string
}

export function DroughtSidebar({ className }: DroughtSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-2 px-2">
            <h2 className="text-xl font-semibold tracking-tight flex items-center">
              <Droplets className="h-5 w-5 mr-2 text-orange-500 dark:text-orange-400" />
              DroughtFight
            </h2>
            <ThemeToggle />
          </div>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="px-6 mt-8">
          <div className="rounded-lg bg-orange-500/10 p-3 dark:bg-orange-900/20">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-orange-500 dark:text-orange-400">Drought Monitor</div>
              <div className="text-xs bg-orange-500 text-white dark:bg-orange-600 px-2 py-1 rounded-full">Active</div>
            </div>
            <p className="text-xs mt-1 text-muted-foreground">
              Monitoring Laghouat Wilaya, Algeria (Wilaya Code 03). Dashboard shows real-time drought conditions and land use data.
            </p>
          </div>
          
          {/* Theme Toggle */}
          <div className="flex items-center justify-between mt-4 rounded-lg border border-muted/30 p-3 bg-card/50 backdrop-blur-sm">
            <div className="text-sm font-medium">Orange Theme</div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )

}
