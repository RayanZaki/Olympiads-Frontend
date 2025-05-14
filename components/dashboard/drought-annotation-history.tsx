import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, User, MapPin, Eye, Trash, Edit } from "lucide-react"

// Mock annotation history
const annotationHistory = [
  {
    id: "anno-1",
    label: "Severe Drought",
    level: "severe",
    color: "#f97316", // Orange
    region: "Northern Autauga County",
    createdAt: "May 12, 2024",
    createdBy: "Dr. John Smith",
    status: "active"
  },
  {
    id: "anno-2",
    label: "Moderate Drought",
    level: "moderate",
    color: "#d97706", // Amber
    region: "Eastern Autauga County",
    createdAt: "May 13, 2024",
    createdBy: "Dr. Maria Johnson",
    status: "active"
  },
  {
    id: "anno-3",
    label: "Abnormally Dry",
    level: "abnormal",
    color: "#eab308", // Yellow
    region: "Southern Autauga County",
    createdAt: "May 10, 2024",
    createdBy: "Dr. Robert Williams",
    status: "archived"
  }
];

export function DroughtAnnotationHistory() {
  return (
    <Card className="border border-muted/30 bg-card/60 backdrop-blur-sm shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <Clock className="h-4 w-4 mr-2 text-orange-500" />
          Annotation History
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0 py-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left font-medium">Label</th>
                <th className="px-4 py-2 text-left font-medium">Region</th>
                <th className="px-4 py-2 text-left font-medium">Created By</th>
                <th className="px-4 py-2 text-left font-medium">Date</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {annotationHistory.map((annotation) => (
                <tr key={annotation.id} className="border-b border-border hover:bg-muted/30">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: annotation.color }}
                      ></div>
                      {annotation.label}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {annotation.region}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 text-muted-foreground" />
                      {annotation.createdBy}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-muted-foreground">
                    {annotation.createdAt}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      annotation.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400'
                    }`}>
                      {annotation.status.charAt(0).toUpperCase() + annotation.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600">
                        <Trash className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
