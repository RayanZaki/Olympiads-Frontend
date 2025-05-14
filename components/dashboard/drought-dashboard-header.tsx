'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Download, Filter, User, LogOut, MonitorSmartphone, CloudRain } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from 'next/navigation'

export function DroughtDashboardHeader() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-secondary/5 backdrop-blur-sm rounded-xl p-4 border border-muted/30">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-primary-foreground flex items-center">
          <CloudRain className="h-6 w-6 mr-2 text-orange-500 dark:text-orange-400" />
          Autauga County Drought Monitor 
        </h1>
        <p className="text-muted-foreground">FIPS 1001 - Drought forecasting and monitoring dashboard</p>
      </div>
      <div className="flex items-center gap-2">
        {/* <Button variant="outline" size="sm" className="border-muted/30">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button> */}
        {/* <Button variant="outline" size="sm" className="border-muted/30">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full border-muted/30">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard')}>
              <MonitorSmartphone className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
