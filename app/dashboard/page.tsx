import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from 'next/navigation'
import ProtectedRoute from "@/components/auth/ProtectedRoute"

export const metadata: Metadata = {
  title: "Dashboard | DroughtFight",
  description: "DroughtFight drought monitoring dashboard",
}

export default function DashboardPage() {
  // Redirect directly to the drought dashboard
  redirect('/dashboard/drought')
  
  return null
}