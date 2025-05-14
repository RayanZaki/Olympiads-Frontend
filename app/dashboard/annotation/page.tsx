import type { Metadata } from "next"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { DroughtAnnotationHeader } from "@/components/dashboard/drought-annotation-header"
import { DroughtAnnotationMap } from "@/components/dashboard/drought-annotation-map"
import { DroughtAnnotationTools } from "@/components/dashboard/drought-annotation-tools"
import { DroughtAnnotationHistory } from "@/components/dashboard/drought-annotation-history"

export const metadata: Metadata = {
  title: "Drought Annotation | DroughtScan",
  description: "Expert drought region annotation tool for DroughtScan",
}

export default function DroughtAnnotationPage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-6 p-6 lg:p-8">
        <DroughtAnnotationHeader />
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Annotation tools sidebar */}
          <div className="md:col-span-1">
            <DroughtAnnotationTools />
          </div>
          
          {/* Main annotation map */}
          <div className="md:col-span-3">
            <DroughtAnnotationMap />
          </div>
        </div>
        
        {/* Annotation history */}
        <div className="mt-4">
          <DroughtAnnotationHistory />
        </div>
      </div>
    </ProtectedRoute>
  )
}
