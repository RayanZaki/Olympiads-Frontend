import type { Metadata } from "next"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { DroughtDashboardHeader } from "@/components/dashboard/drought-dashboard-header"
import { DroughtHeader, DroughtScore } from "@/components/dashboard/drought-header"
import { DroughtMonitoring } from "@/components/dashboard/drought-monitoring"
import { LandUseMap } from "@/components/dashboard/land-use-map"
import { LandUseAnalytics } from "@/components/dashboard/land-use-analytics"
import { GroundwaterAnalysis } from "@/components/dashboard/groundwater-analysis"
import { DroughtMap } from "@/components/dashboard/drought-map"

export const metadata: Metadata = {
    title: "Drought Dashboard | DroughtFight",
    description: "DroughtFight drought monitoring dashboard for Autauga County, Alabama",
}

export default function DroughtDashboardPage() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col gap-6 p-6 lg:p-8">
                <DroughtDashboardHeader />
                <div className="h-[40rem] grid grid-cols-1 grid-rows-2 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 row-span-2 overflow-hidden rounded-lg border border-muted/30 bg-card/50 backdrop-blur-sm shadow-lg">
                        <DroughtMap />
                    </div>
                    <div className="lg:col-span-1 h-full">
                        <DroughtScore />
                    </div>
                    <div className="md:col-span-1">
                        <DroughtMonitoring />
                    </div>
                </div>


                <div id="land-use" className="pt-4">
                    <LandUseAnalytics />
                </div>

                <div id="groundwater" className="pt-4">
                    <GroundwaterAnalysis />
                </div>
            </div>
        </ProtectedRoute>
    )
}
