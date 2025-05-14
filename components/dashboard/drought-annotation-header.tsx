import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Save, Undo, Info, HelpCircle } from "lucide-react"

export function DroughtAnnotationHeader() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Drought Region Annotation</h1>
          <p className="text-muted-foreground">
            Create accurate drought severity annotations and classifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Help</span>
          </Button>
          <Button size="sm" className="gap-1">
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save All</span>
          </Button>
        </div>
      </div>
      
      <Card className="bg-card/60 backdrop-blur-sm shadow-sm border-muted/30">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Current Region:</span>
              <span>Laghouat, Algeria (Wilaya Code 03)</span>
            </div>
            
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs h-8">
                <Undo className="h-3.5 w-3.5 mr-1" />
                Undo
              </Button>
              <Button variant="secondary" size="sm" className="text-xs h-8">
                <Info className="h-3.5 w-3.5 mr-1" />
                Expert Guidelines
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
