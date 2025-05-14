"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BarChart3,
  FileText,
  Home,
  Leaf,
  MapPin,
  Bell,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Sun,
  Moon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { authAPI } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Check if we're on a larger screen
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  // After mounting, we can safely show the theme UI
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    // Set initial value
    checkScreenSize()

    // Add event listener
    window.addEventListener('resize', checkScreenSize)

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Close mobile menu on navigation or on large screens
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname, isLargeScreen])

  // Mock user for now
  // useEffect(() => {
  //   setUser({
  //     full_name: "John Farmer",
  //     role: "inspector"
  //   })
  // }, [])

  const handleLogout = async () => {
    try {
      await authAPI.logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <AuthProvider>
      <div className="w-full flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black relative overflow-hidden" data-dashboard="true">
        {/* Background patterns */}
        <div className="pattern-grid absolute inset-0 opacity-[0.02] dark:opacity-[0.04] pointer-events-none"></div>
        <div className="pattern-dots absolute inset-0 opacity-10 pointer-events-none"></div>

        {/* Animated background circles */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-2/3 -right-20 w-80 h-80 bg-secondary/20 dark:bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-accent/20 dark:bg-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Sidebar for desktop */}
        <div className={cn(
          "fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:static lg:translate-x-0",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex flex-col h-full overflow-y-auto bg-white dark:bg-black shadow-xl rounded-r-3xl border-r border-gray-100 dark:border-gray-800">
            {/* Mobile close button */}
            <div className="absolute top-4 right-4 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-6 py-4">
              <Link href="/dashboard/drought" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 shadow-md">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  DroughtFight
                </span>
              </Link>

              {/* Theme toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="rounded-lg text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>

            {/* User info */}
            <AuthProvider>
              <UserChip />
            </AuthProvider>

            <Separator className="mx-3 bg-gray-100 dark:bg-gray-800" />

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4">
              <div className="space-y-1">
                <Link
                  href="/dashboard/drought"
                  className={cn(
                    "group flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                    pathname === '/dashboard/drought'
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                >
                  <Leaf
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors duration-200",
                      pathname === '/dashboard/drought'
                        ? "text-primary"
                        : "text-gray-400 dark:text-gray-500 group-hover:text-primary/70"
                    )}
                    aria-hidden="true"
                  />
                  Drought Monitor

                  {/* Active indicator */}
                  {pathname === '/dashboard/drought' && (
                    <span className="ml-auto h-2 w-2 rounded-full bg-primary"></span>
                  )}
                </Link>
              </div>
            </nav>

            <div className="px-3 py-4 mt-auto">
              <Separator className="mb-4 bg-gray-100 dark:bg-gray-800" />

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="mt-2 w-full group flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
              >
                <LogOut
                  className="h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200"
                  aria-hidden="true"
                />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col w-full">
          {/* Mobile header */}
          <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 sm:px-6 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-700 dark:text-gray-300"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open sidebar</span>
            </Button>

            <div className="flex flex-1 items-center justify-between gap-x-4"> </div>
            <div className="flex flex-shrink-0 items-center gap-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600">
                <span className="text-lg font-semibold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                  DroughtFight
                </span>
              </div>

              {/* Theme toggle (mobile) */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="rounded-lg text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto pb-10 w-full relative z-0">
            {/* Content container */}
            <div className="relative z-10 w-full dashboard-content">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}


export function UserChip() {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="mx-3 my-6">
        <div className="rounded-xl bg-primary/5 dark:bg-primary/10 p-4 backdrop-blur-sm">
          <div className="flex flex-col gap-2 animate-pulse">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="mx-3 my-6">
      <div className="rounded-xl bg-primary/5 dark:bg-primary/10 p-4 backdrop-blur-sm">
        {user && (
          <div className="flex flex-col items-start">
            <p className="font-medium text-gray-800 dark:text-gray-200">{user.full_name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        )}
      </div>
    </div>
  )
}